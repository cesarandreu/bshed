'use strict';

var Bluebird = require('bluebird'),
  assert = require('assert'),
  AWS = require('aws-sdk'),
  s3 = require('s3');

module.exports = function s3Loader (config) {
  assert(config);

  var s3Client = s3.createClient({
    s3Client: new AWS.S3(config)
  });

  s3Client.uploadFilePromise = function uploadFilePromise (config) {
    return new Bluebird(function (resolve, reject) {
      s3Client.uploadFile(config).on('end', resolve).on('error', reject);
    });
  };

  s3Client.deleteObjectsPromise = function deleteObjectsPromise (config) {
    return new Bluebird(function (resolve, reject) {
      s3Client.deleteObjects(config).on('end', resolve).on('error', reject);
    });
  };

  s3Client.endpoint = config.aws.endpoint;

  return s3Client;
};
