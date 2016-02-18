var request = require('request');
var config  = require('./config');
var Promise = require('promise');

module.exports = {
  byPostcode: function(postcode, endpoint) {
    var url = config.baseUrl + '/postcodes/' + postcode + '/' + endpoint + '?user_key=' + config.userKey;
    return this.query(url);
  },

  byLatLon: function(latlon, endpoint) {
    var url = config.baseUrl + '/@' + latlon + '/' + endpoint + '?user_key=' + config.userKey;
    return this.query(url);
  },

  query: function(url) {
    return new Promise(function(fullfill, reject) {
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
