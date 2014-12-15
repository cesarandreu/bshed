'use strict';

module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    name: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['image/png', 'image/jpeg']]
      }
    },

    // associations
    BikeshedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    paranoid: true,
    getterMethods: {
      path: function path () {
        return '/BikeshedImages/' + this.key;
      },
      key: function key () {
        return this.BikeshedId + '/' + this.name;
      }
    },
    classMethods: {
      associate: function associate (models) {
        models.Image.belongsTo(models.Bikeshed);
        models.Image.hasMany(models.Vote);
      },

      // creates images and uploads them to s3
      bulkCreateAndUpload: function* createAndUploadFiles (files, s3, opts) {
        var images = files.map(function (file) {
          return Image.build({BikeshedId: file.BikeshedId, type: file.type});
        });

        var validationErrors = (yield images.map(function (image) {
          return image.validate();
        })).filter(function (validationError) {
          return validationError;
        });
        if (validationErrors.length) {
          throw validationErrors;
        }

        var uploadFile = function uploadFile (image, idx) {
          return s3.uploadFilePromise({
            localFile: files[idx].path,
            s3Params: {
              ACL: 'public-read',
              Bucket: 'BikeshedImages',
              ContentType: files[idx].type,
              Key: image.key
            }
          });
        };
        var deleteFiles = function deleteFile (objects) {
          return s3.deleteObjectsPromise({
            Bucket: 'BikeshedImages',
            Delete: {Objects: objects}
          });
        };

        // TODO: add worker to clean up failed uploads~
        // Throws error if any image upload fails
        try {
          yield images.map(uploadFile);
        } catch (err) {

          // try to clean up, not tested, may not work~
          try {
            yield deleteFiles(images.map(function (image) {
              return {Key: image.key};
            }));
          } catch (e) {
            console.error('ERROR DELETING FILES', e);
          }
          throw err;
        }

        // return list of saved images
        return yield images.map(function (image) {
          return image.save(opts);
        });
      }
    },
    instanceMethods: function () {

    }
  });

  return Image;
};
