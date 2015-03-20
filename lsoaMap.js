var config = require('./config');
require('mapbox.js');

var mb = L.mapbox;

function LSOAMap(mapEl) {
  mb.accessToken = config.mapboxToken;
  if (!(this instanceof LSOAMap)) return new LSOAMap(mapEl);
  this.mapEl = mapEl;
}

LSOAMap.prototype.render = function(lsoaGeoJSON) {
  this.map       = this.map || mb.map(this.mapEl, config.mapboxMapId);
  this.lsoaLayer = this.lsoaLayer || mb.featureLayer().addTo(this.map);
  this.lsoaLayer.setGeoJSON(lsoaGeoJSON);
  this.map.fitBounds(this.lsoaLayer.getBounds());
};

module.exports = LSOAMap;
