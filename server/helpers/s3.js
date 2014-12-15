'use strict';

var Bluebird = require('bluebird'),
  AWS = require('aws-sdk'),
  _s3 = require('s3');

// returns s3 client
module.exports = function s3 (config) {
  if (!config.aws) {
    throw new Error('s3 expected config.aws');
  }

  var s3Client = _s3.createClient({
    s3Client: new AWS.S3(config.aws)
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
