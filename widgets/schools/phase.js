var utils = require('../../utils');
var School = require('./school');

var phaseHTML = function phaseHTML(name) {
  return '<div class="phase"><h4>' + name + '</h4></div>';
};

function SchoolPhase(name, schoolDataList, container) {
  if (!(this instanceof SchoolPhase)) return new SchoolPhase(name, schoolDataList, container);

  this.name           = name;
  this.schoolDataList = schoolDataList;
  this.container      = container;
}

SchoolPhase.prototype.render = function() {
  var html = phaseHTML(this.name);
  var phaseContent = utils.fromHTML(html)[0];
  this.container.appendChild(phaseContent);
  this.schoolDataList.forEach(function(schoolData) {
    School(schoolData, this.container).render();
  }, this);
};

module.exports = SchoolPhase;
