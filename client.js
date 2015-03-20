var request   = require('request');
var analytics = require('./analytics');
var config    = require('./config');

module.exports = {
  withPostcodeEndpoint: function(postcode, label, onSuccess, onError) {
    var url = config.baseUrl + postcode + config.queryString;
    analytics.notifySubmit(label, postcode);

    request(url, function(err, response, body) {
      if(!err && response.statusCode >= 200 && response.statusCode < 400) {
        analytics.notifySuccess(label, postcode);
        onSuccess(JSON.parse(body));
      } else {
        analytics.notifyFailure(label, postcode);
        var bodyErrorMessage = body && JSON.parse(body).error;
        var errorMessage = null;

        if (bodyErrorMessage) {
          errorMessage = bodyErrorMessage;
        } else {
          errorMessage = "An error occurred, please try again later";
        }

        onError(errorMessage);
      }
    });
  }
};
