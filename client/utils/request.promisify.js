'use strict';

module.exports = function promises (request) {
  request['then'] = _then.bind(request);
  request['catch'] = _catch.bind(request);
  return request;
}

function _then (fulfilled, rejected) {
  this.promise = this.promise ? this.promise : new Promise((resolve, reject) => {
    this.end((err, res) => err ? reject(err) : resolve(res));
  }.bind(this))
  return this.promise.then(fulfilled, rejected);
}

function _catch (rejected) {
  this.promise = this.promise ? this.promise : this.then();
  return this.promise.catch(rejected);
}
