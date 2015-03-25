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
    Line: {
      datasetFill: false,
      scaleShowGridLines: false,
      pointDot: false
    }
  }
};
