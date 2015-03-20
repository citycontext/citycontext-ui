var analytics = (function() {
  var notifySubmit = function notifySubmit(feature, postcode) {
    if (typeof ga === 'undefined') return;

    ga('send', {
      'hitType': 'event',
      'eventCategory': 'Try feature',
      'eventAction': 'Submit ' + feature,
      'eventLabel': 'Try ' + feature + ' for postcode ' + postcode
    });
  };

  var notifySuccess = function notifySuccess(feature, postcode) {
    if (typeof ga === 'undefined') return;

    ga('send', {
      'hitType': 'event',
      'eventCategory': 'Try feature',
      'eventAction': 'Success ' + feature,
      'eventLabel': 'Succeeded ' + feature + ' lookup for postcode ' + postcode
    });
  };

  var notifyFailure = function notifyFailure(feature, postcode) {
    if (typeof ga === 'undefined') return;

    ga('send', {
      'hitType': 'event',
      'eventCategory': 'Try feature',
      'eventAction': 'Failure ' + feature,
      'eventLabel': 'Failed ' + feature + '  lookup for postcode ' + postcode
    });
  };

  return {
    notifySubmit: notifySubmit,
    notifySuccess: notifySuccess,
    notifyFailure: notifyFailure
  };
})();

module.exports = analytics;
