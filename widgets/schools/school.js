var fs     = require('fs');
var jade   = require('jade');
var utils  = require('../../utils');

var schoolTemplate = fs.readFileSync(__dirname + '/templates/school.jade', 'utf-8');
var schoolHTML     = jade.compile(schoolTemplate);

function School(schoolData, container) {
  if (!(this instanceof School)) {
    return new School(schoolData, container);
  }

  // number goes from 1 (best) to 4 (worst)
  var mark = function mark(number) {
    var nFullCircles = 5 - number,
        nEmptyCircle = number - 1,
        circles      = "";

    for (var i = 0; i < nFullCircles; i++) {
      circles += '<div class="circle full-circle"></div>';
    }

    for (var j = 0; j < nEmptyCircle; j++) {
      circles += '<div class="circle empty-circle"></div>';
    }

    return circles;
  };

  var shorten = function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength-3) + "&hellip;";
    }
    return ret;
  };

  var formatDistance = function formatDistance(metres, precision) {
    return (metres / 1609.344).toPrecision(precision).toString() + ' miles';
  };

  this.schoolData                  = schoolData;
  this.urn                         = schoolData.urn;
  this.id                          = 'school-' + this.urn;
  this.label                       = shorten(this.schoolData.schoolName, 30);
  this.distance                    = formatDistance(this.schoolData.distanceMetres, 2);
  this.overallEffectivenessMark    = mark(this.schoolData.overallEffectiveness);
  this.qualityOfTeachingMark       = mark(this.schoolData.qualityOfTeaching);
  this.leadershipAndManagementMark = mark(this.schoolData.leadershipAndManagement);
  this.lastInspectionUrl           = this.schoolData.lastInspectionUrl;
  this.container                   = container;
  this.active                      = false;

  this.toggleActive = function() {
    var customEventInit = { detail: { schoolURN: this.urn } };
    var typeArg = this.active ? 'citycontext.schoolDeactivated' : 'citycontext.schoolActivated';
    var event = new CustomEvent(typeArg, customEventInit);
    document.dispatchEvent(event);
    this.active = !this.active;
  };
}

School.prototype.render = function() {
  var schoolEl = utils.fromHTML(schoolHTML({ school: this }))[0];
  this.container.appendChild(schoolEl);
  var headingEl     = schoolEl.querySelector('.school-heading');
  var descriptionEl = schoolEl.querySelector('.school-description');

  headingEl.addEventListener('click', function() {
    descriptionEl.classList.toggle('expanded');
    this.toggleActive();
  }.bind(this));
};

module.exports = School;
