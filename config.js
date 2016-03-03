module.exports = {
  baseUrl: 'http://localhost:8080/v2/',
  queryString: undefined,
  userKey: undefined,
  mapboxMapId: undefined,
  mapboxToken: undefined,
  mapNoisePOIColor: '#696969',
  mapMarkersColor: '#409840',
  mapPOIColor: '#BE5050',

  chartsOptions: {
    global: {
      responsive: true
    },
    Bar: {
      barStrokeWidth : 0.5,
      barDatasetValue : 3,
      barDatasetSpacing : 0
    }
  },

  criminalityGraph: {
    barColorsRGBA: [
      [64, 152, 63],
      [63, 64, 152],
      [152, 63, 64]
    ]
  },

  noiseTypes: {
    roadDay: 'RD_DAY',
    roadDay: 'RD_NGT',
    railDay: 'RL_DAY',
    railDay: 'RL_NGT',
  },

  noiseColors: {
    '50.0-54.9': '#FFD900',
    '55.0-59.9': '#FF9500',
    '60.0-64.9': '#FF5900',
    '65.0-69.9': '#FF6200',
    '70.0-74.9': '#FF0D00',
    '>=70.0': '#FF0D00',
    '>=75.0': '#FF004C'
  }
};
