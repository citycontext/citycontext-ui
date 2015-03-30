var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Results   = require('../../../widgets/schools/results');
var config    = require('../../../config');

var firstSchoolLat = 51.778083;
var firstSchoolLon = -0.016283;

var secondSchoolLat = 51.776495;
var secondSchoolLon = -0.006423;

var poiLat = 51.778115;
var poiLon = -0.013797;

var schoolsData = [
  {
    'leadershipAndManagement': 2,
    'typeOfEstablishment': 'Foundation Special School',
    'location': {
      'lat': firstSchoolLat,
      'lon': firstSchoolLon
    },
    'qualityOfTeaching': 2,
    'phase': 'Special',
    'lastInspectionDate': '2013-03-21',
    'schoolName': 'Hailey Hall School',
    'distanceMetres': 171,
    'overallEffectiveness': 2,
    'urn': 117673,
    'lastInspectionUrl': 'http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/117673'
  },
  {
    'leadershipAndManagement': 2,
    'typeOfEstablishment': 'Community School',
    'location': {
      'lat': secondSchoolLat,
      'lon': secondSchoolLon
    },
    'qualityOfTeaching': 2,
    'phase': 'Primary',
    'lastInspectionDate': '2012-02-03',
    'schoolName': 'The Cranbourne Primary School',
    'distanceMetres': 538,
    'overallEffectiveness': 2,
    'urn': 117307,
    'lastInspectionUrl': 'http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/117307'
  }
];

var resultsElement = R.createElement(Results, {
  data: {
    location: {
      lat: poiLat,
      lon: poiLon
    },
    schools: schoolsData
  }
});

var results = testUtils.renderIntoDocument(resultsElement);
results.setState({ activeURNs: [117307] });

tape('getGeoJSON', function(t) {
  //The second school only is active
  t.plan(1);

  t.deepEqual(
    results.getGeoJSON(),
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            coordinates: [firstSchoolLon,firstSchoolLat],
            type: 'Point'
          },
          properties: {
            title: 'Hailey Hall School',
            'marker-symbol': 'school'
          }
        },
        {
          type: 'Feature',
          geometry: {
            coordinates: [secondSchoolLon,secondSchoolLat],
            type: 'Point'
          },
          properties: {
            title: 'The Cranbourne Primary School',
            'marker-color': config.mapMarkersColor,
            'marker-symbol': 'school',
            'marker-size': 'large'
          }
        },
        {
          type: 'Feature',
          geometry: {
            coordinates: [poiLon,poiLat],
            type: 'Point'
          },
          properties: {
            'marker-color': config.mapMarkersColor,
            'marker-style': 'solid'
          }
        }
      ]
    }
  );
});
