var jade    = require('jade');
var fs      = require('fs');
var utils   = require('../utils');
var LSOAMap = require('../lsoaMap');
var Widget  = require('./widget');
var client  = require('../client');
var Form    = require('./shared/form');

var resultTemplate = fs.readFileSync(__dirname + '/templates/demographics-results.jade', 'utf-8');
var resultHTML     = jade.compile(resultTemplate)();
var resultContent  = utils.fromHTML(resultHTML);

DemographicsWidget.prototype   = new Widget();
DemographicsWidget.constructor = DemographicsWidget;
function DemographicsWidget(formEl, resultEl, errorEl, opts) {
  if (!(this instanceof DemographicsWidget)) {
    return new DemographicsWidget(formEl, resultEl, errorEl, opts);
  }

  Widget.call(this, formEl, resultEl, errorEl, opts);
}

DemographicsWidget.prototype.render = function() {
  var res = document.querySelector(this.resultEl);

  resultContent.forEach(function(el) {
    res.appendChild(el);
  });

  var header                         = res.querySelector('.demographics-results-header');
  var mapEl                          = res.querySelector('.demographics-map');
  var lsoaMap                        = LSOAMap(mapEl);
  var allUsualResidents              = res.querySelector('.demographics-all-usual-residents');
  var communalEstablishmentResidents = res.querySelector('.demographics-communal-establishment-residents');
  var householdResidents             = res.querySelector('.demographics-household-residents');
  var households                     = res.querySelector('.demographics-households');
  var personsPerHectare              = res.querySelector('.demographics-persons-per-hectare');
  var personsPerHousehold            = res.querySelector('.demographics-persons-per-household');

  var reset = function reset() {
    this.errMsg.style.display = 'none';
    res.style.display = 'none';
  }.bind(this);

  var displayStats = function displayStats(data) {
    var pop = data.lsoa.population;

    allUsualResidents.innerText              = pop.allUsualResidents;
    communalEstablishmentResidents.innerText = pop.communalEstablishmentResidents;
    householdResidents.innerText             = pop.householdResidents;
    households.innerText                     = pop.households;
    personsPerHectare.innerText              = pop.personsPerHectare;
    personsPerHousehold.innerText            = pop.personsPerHousehold;
  };

  var onSuccess = function onSuccess(data) {
    var lsoaGeoJSON = JSON.parse(data.lsoa.geometry);

    header.innerText  = 'Population statistics for ' + data.lsoa.name + ' LSOA';
    res.style.display = '';

    displayStats(data);
    lsoaMap.render(lsoaGeoJSON);
  };

  var form = Form(this.formEl, function(val) {
    reset();

    client.withPostcodeEndpoint(val, 'demographics', onSuccess, this.onError);
  }.bind(this));

  form.render();
};

module.exports = DemographicsWidget;
