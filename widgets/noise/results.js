var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var MapboxMap = require('../shared/mapboxMap');
var Description = require('./description');
var config = require('../../config');
//var Description = require('./description');
var Results = R.createClass({
  displayName: 'noise-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  nearestNoise: function(noiseType) {
    var noise = this.props.data && this.props.data.noise;
    if (!noise) return;

    for (var i = 0; i < noise.length; i++) {
      if(noise[i].noiseType === noiseType) {
        return noise[i];
      }
    }
  },

  render: function() {
    var data  = this.props.data;
    var style = this.props.show ? {} : { display: 'none' };
    var areas = [];
    var featureCollection;
    var sectionEl;
    var point;

    if (!data) { return D.div(null); }

    point = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [data.location.lon, data.location.lat]
      },
      properties: {
        'marker-color': config.mapNoisePOIColor,
        'marker-style': 'solid'

      }
    };


    areas = data.noise.map(function (area) {
      var color = config.noiseColors[area.noiseClass];

      return {
        type: "Feature",
        geometry: area.geometry,
        properties: {
          stroke: color,
          fill: color,
          noiseType: area.noiseType,
          noiseClass: area.noiseClass,
          distance: area.distance
        }
      };
    });

    featureCollection = {
      type: "FeatureCollection",
      features: [point].concat(areas)
    };

    if (config.mapboxMapId && areas.length) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, { 
          geoJSON: featureCollection, size: 'half'
        }),
        R.createElement(Description, {
          roadDay: this.nearestNoise(config.noiseTypes.roadDay),
          roadNight: this.nearestNoise(config.noiseTypes.roadNight),
          railDay: this.nearestNoise(config.noiseTypes.railDay),
          raildDay: this.nearestNoise(config.noiseTypes.railDay)
        })
      );
    } else {
      //sectionEl = D.section(null,
      //  R.createElement(Description, { floodData: floodData, isAtRisk: isAtRisk, size: 'full' })
      //);
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Noise in this area' }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
