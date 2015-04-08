module.exports = {
  baseUrl: 'https://api.citycontext.com/beta',
  queryString: undefined,
  userKey: undefined,
  mapboxMapId: undefined,
  mapboxToken: undefined,

  mapMarkersColor: '#409840',

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
  }
};
