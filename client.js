var request = require('request');
var config  = require('./config');
var Promise = require('promise');

module.exports = {
  byPostcode: function(postcode) {
    return new Promise(function(fullfill, reject) {
      var url = config.baseUrl + '/' + postcode + '?user_key=' + config.userKey;

      request(url, function(err, response, body) {
        if(!err && response.statusCode >= 200 && response.statusCode < 400) {
          fullfill(JSON.parse(body));
        } else {
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
