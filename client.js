var request   = require('request');
var analytics = require('./analytics');
var config    = require('./config');
var Promise   = require('promise');

module.exports = {
  byPostcode: function(postcode, label) {
    return new Promise(function(fullfill, reject) {
      var url = config.baseUrl + '/' + postcode + '?user_key=' + config.userKey;
      analytics.notifySubmit(label, postcode);

      request(url, function(err, response, body) {
        if(!err && response.statusCode >= 200 && response.statusCode < 400) {
          analytics.notifySuccess(label, postcode);
          fullfill(JSON.parse(body));
        } else {
          analytics.notifyFailure(label, postcode);
          var bodyErrorMessage = body && JSON.parse(body).error;
          var errorMessage = null;

          if (bodyErrorMessage) {
            errorMessage = bodyErrorMessage;
          } else {
            errorMessage = 'An error occurred, please try again later';
          }

          reject(errorMessage);
        }
      });
    });
  }
};
