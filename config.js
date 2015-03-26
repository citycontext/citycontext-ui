module.exports = {
  baseUrl: 'https://api.citycontext.com/beta/postcodes',
  queryString: undefined,
  userKey: undefined,
  mapboxMapId: undefined,
  mapboxToken: undefined,

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
