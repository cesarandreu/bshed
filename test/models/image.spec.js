'use strict';

var helper = require('./helper'),
  fixtures = helper.fixtures,
  models = helper.models,
  Image = models.Image,
  path = require('path');

var image, images, error, s3, _s3;

describe('Model:Image', function () {

  beforeEach(function* () {
    error = null;
    image = yield Image.create({
      type: 'image/png'
    });
  });

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(image).to.be.an('object');
      expect(image.id).to.be.a('number');
      expect(image.type).to.be.a('string').and.to.equal('image/png');
    });

  });


  describe('methods', function () {

    describe('bulkCreateAndUpload', function () {

      beforeEach(function () {
        _s3 = Image.s3;
        image = {
          type: 'image/png',
          BikeshedId: 1,
          path: path.join(fixtures, 'puppy_01.jpg')
        };
        s3 = {
          uploadFilePromise: function uploadFilePromise () {
            return Promise.resolve();
          },
          deleteObjectsPromise: function deleteObjectsPromise () {
            return Promise.resolve();
          }
        };
      });

      afterEach(function () {
        Image.s3 = _s3;
      });

      it('should return all instances on success', function* () {
        Image.s3 = s3;
        images = yield Image.bulkCreateAndUpload([image, image]);
        expect(images).to.have.length(2);
        images.forEach(function (img) {
          expect(img).to.be.an('object');
          expect(img.type).to.equal(image.type);
          expect(img.BikeshedId).to.equal(image.BikeshedId);
        });
      });

      it('should throw when there are validation errors', function* () {
        image.type = 'invalid/type';
        try {
          yield Image.bulkCreateAndUpload([image, image]);
        } catch (err) {
          error = err;
        } finally {
          expect(error).to.exist();
        }
      });

      it('should throw when it fails to upload', function* () {
        s3.uploadFilePromise = function uploadFilePromise () {
          return Promise.reject(new Error('failed upload'));
        };
        Image.s3 = s3;
        try {
          yield Image.bulkCreateAndUpload([image, image]);
        } catch (err) {
          error = err;
        } finally {
          expect(error).to.exist();
        }
      });

    });

  });

});
