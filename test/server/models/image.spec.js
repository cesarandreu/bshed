'use strict';

var helper = require('../helper'),
  Bluebird = require('bluebird'),
  path = require('path'),
  _ = require('lodash');

var models = helper.models,
  Vote = models.Vote,
  Bikeshed = models.Bikeshed,
  Image = models.Image;

var image, images, error, s3;

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
        image = {
          type: 'image/png',
          BikeshedId: 1,
          path: path.join(helper.fixtures, 'puppy_01.jpg')
        };
        s3 = {
          uploadFilePromise: function uploadFilePromise () {
            return Bluebird.resolve();
          },
          deleteObjectsPromise: function deleteObjectsPromise () {
            return Bluebird.resolve();
          }
        };

      });

      it('should return all instances on success', function* () {
        images = yield Image.bulkCreateAndUpload([image, image], s3);
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
          return Bluebird.reject(new Error('failed upload'));
        };
        try {
          yield Image.bulkCreateAndUpload([image, image], s3);
        } catch (err) {
          error = err;
        } finally {
          expect(error).to.exist();
        }
      });

    });

  });

});
