var fs         = require('fs');
var jade       = require('jade');
var Widget     = require('./widget');
var client     = require('../client');
var config     = require('../config');
var utils      = require('../utils');
var Form       = require('./shared/form');
var Phase      = require('./schools/phase');
var SchoolsMap = require('../schoolsMap');

var resultTemplate = fs.readFileSync(__dirname + '/templates/schools-results.jade', 'utf-8');
var resultHTML     = jade.compile(resultTemplate)();
var resultContent  = utils.fromHTML(resultHTML);

SchoolsWidget.prototype   = new Widget();
SchoolsWidget.constructor = Widget;
function SchoolsWidget(formEl, resultEl, errorEl, opts) {
  if (!(this instanceof SchoolsWidget)) {
    return new SchoolsWidget(formEl, resultEl, errorEl, opts);
  }

  Widget.call(this, formEl, resultEl, errorEl, opts);
}

SchoolsWidget.prototype.render = function() {
  var model = {
    schools: [],
    activeURNs: [],
    poi: undefined
  };

  var res = document.querySelector(this.resultEl);

  resultContent.forEach(function(el) {
    res.appendChild(el);
  });

  var mapEl        = res.querySelector('.schools-map');
  var schoolListEl = res.querySelector('.school-list');
  var map          = SchoolsMap(mapEl);

  var reset = function reset() {
    this.errMsg.style.display = 'none';
    res.style.display = 'none';
  }.bind(this);

  var displayMap = function displayMap() {
    map.render(model);
  };

  var activate = function activate(urn) {
    model.activeURNs.push(urn);
    displayMap();
  };

  var deactivate = function deactivate(urn) {
    model.activeURNs = model.activeURNs.filter(function(_urn) {
      return urn !== _urn;
    });
    displayMap();
  };


  document.addEventListener('citycontext.schoolActivated', function(ev) {
    activate(ev.detail.schoolURN);
  });

  document.addEventListener('citycontext.schoolDeactivated', function(ev) {
    deactivate(ev.detail.schoolURN);
  });

  var displaySchoolList = function displaySchoolList() {
    var phaseNames = [
      "Nursery",
      "Primary",
      "Secondary",
      "Special",
      "PRU (Pupil Referral Unit)"
    ],
        phases = {};

    schoolListEl.innerHTML = '';

    phaseNames.forEach(function(phaseName) {
      var schoolsInPhase = model.schools.filter(function(school) {
        return school.phase === phaseName;
      });

      if (schoolsInPhase.length) {
        Phase(phaseName, schoolsInPhase, schoolListEl).render();
      }
    });
  };

  var onSuccess = function onSuccess(data) {
    res.style.display = '';

    model.schools = data.schools;
    model.poi     = data.location;
    displaySchoolList();
    displayMap();
  };

  var form = Form(this.formEl, function(val) {
    reset();
    client.withPostcodeEndpoint(val, 'schools', onSuccess, this.onError);
  }.bind(this));

  form.render();
};

module.exports = SchoolsWidget;
