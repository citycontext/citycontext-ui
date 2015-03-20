var config = require('./config');
require('mapbox.js');

var mb = L.mapbox;
var themeGreen = '#409840';

var schoolsGeoJSON = function schoolsGeoJSON(model) {
  var isActive = function isActive(school) {
    return !!model.activeURNs.filter(function(urn) {
      return urn === school.urn;
    }).length;
  };

  var features = model.schools.map(function(school){
    var properties = {
      title: school.schoolName,
      'marker-symbol': 'school'
    };

    if (isActive(school)) {
      properties["marker-color"] = themeGreen;
      properties["marker-size"]  = "large";
    }

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [school.location.lon, school.location.lat],
      },
      properties: properties
    };
  });

  return {
    type: 'FeatureCollection',
    features: features
  };
};

var poiGeoJSON = function poiGeoJSON(poi) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [poi.lon, poi.lat]
    },
    properties: {
      'marker-color': themeGreen,
      'marker-style': 'solid'
    }
  };
};

function SchoolsMap(mapEl) {
  mb.accessToken = config.mapboxToken;
  if (!(this instanceof SchoolsMap)) return new SchoolsMap(mapEl);
  this.mapEl = mapEl;
}

SchoolsMap.prototype.render = function(model) {
  this.map = this.map || mb.map(this.mapEl, config.mapboxMapId);
  this.schoolsLayer = this.schoolsLayer || mb.featureLayer().addTo(this.map);
  this.schoolsLayer.setGeoJSON(schoolsGeoJSON(model));
  this.poiLayer = this.poiLayer || mb.featureLayer().addTo(this.map);
  this.poiLayer.setGeoJSON(poiGeoJSON(model.poi));
  this.map.fitBounds(this.schoolsLayer.getBounds());
};

module.exports = SchoolsMap;
