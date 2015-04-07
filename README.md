# Overview

This library allows you to add City Context widgets to your web page in a couple of lines, while allowing you to somewhat customize their appearance.

# Examples

The following widgets are available:

  - [Schools](https://www.citycontext.com/features/schools)
  - [Demographics](https://www.citycontext.com/features/demographics)
  - [Criminality](https://www.citycontext.com/features/criminality)

# Quick start

Include City Context scripts and stylesheets in your HTML header tag:

```html
<link href="http://assets.citycontext.com/citycontext-ui.min.css" rel="stylesheet" type="text/css">
<script src="http://assets.citycontext.com/citycontext-ui.min.js"></script>

<!-- If you are using Mapbox, add the stylesheet below as well -->
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.css' rel='stylesheet' />
```

Then add the free user key that you got from [signing up](https://www.citycontext.com/signup) on [City Context](https://www.citycontext.com).

```html
<body>
  ...
  <script>
    citycontext.config.userKey = 'my-citycontext-user-key';

    // In addition, if you want to display a map from Mapbox,
    // You can optionally do so by providing you mapbox credentials
    citycontext.config.mapboxMapId = 'my-mapbox-map-id';
    citycontext.config.mapboxToken = 'my-mapbox-token';
  </script>
</body>
```

To render the widget you need (either `CriminalityWidget`, `SchoolsWidget` or `DemographicsWidget`):

```html
<body>

  ...
  <div id="criminality-widget"></div>
  ...

  <script>
    ...
    citycontext.CriminalityWidget('#criminality-widget').render();
  </script>
</body>
```

Full example:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'></meta>
    <link href="http://assets.citycontext.com/citycontext-ui.min.css" rel="stylesheet" type="text/css">
    <script src="http://assets.citycontext.com/citycontext-ui.min.js"></script>

    <!-- If you are using Mapbox, add the stylesheet below as well -->
    <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.css' rel='stylesheet' />
  </head>
  <body>
    ...
    <div id="criminality-widget"></div>
    ...
    <script>
      citycontext.config.userKey = 'my-citycontext-user-key';

      // In addition, if you want to display a map from Mapbox,
      // You can optionally do so by providing you mapbox credentials
      citycontext.config.mapboxMapId = 'my-mapbox-map-id';
      citycontext.config.mapboxToken = 'my-mapbox-token';

      citycontext.CriminalityWidget('#criminality-widget').render();
    </script>
  </body>
</html>
```

# Using Browserify

The recommended way to use citycontext-ui for a more complex project is through [Browserify](http://browserify.org).

Install the citycontext-ui module and add it to dependencies in package.json:

```bash
npm install --save citycontext-ui
```

Require citycontext-ui in your script

```javascript
// main.js
var citycontext = require('citycontext-ui');
```

Browserify it:

```bash
browserify main.js -o bundle.js
```

# Customizing the appearance

## CSS

The best way to customize the CSS is to compile the stylesheets from the `less` folder of a cloned repo:

```bash
git clone https://github.com/citycontext/citycontext-ui
cd citycontext-ui
npm install
make css
```

citycontext-ui uses the [less](http://lesscss.org/) CSS preprocessor. The `less` folder relies on a number of variables that are found in the `less/theme.less` file. This could be a good first file to modify.

## Javascript

The appearance can be further customized by configuring the widgets.

### Schools

To fit you color scheme, the mapbox markers color can be customized:

```javascript
var citycontext = require('citycontext-ui');
citycontext.mapMarkersColor: '#409840';
citycontext.SchoolsWidget('#schools-widget').render();
```

### Criminality

The criminality bar chart provides a period-by-period (month/quarter/year) comparison between the number of crimes during the last three years.
The colors of the bar for each year can be specified to match you color theme. Each color is represented by a `[red, green, blue]` triple.

```javascript
var citycontext = require('citycontext-ui');
citycontext.criminalityGraph.barColorsRGBA: [
  [64, 152, 63], // first year color
  [63, 64, 152], // second year color
  [152, 63, 64]  // third year color
]
citycontext.CriminalityWidget('#criminality-widget').render();
```

citycontext-ui relies on the [Chart.js](http://www.chartjs.org) library to plot criminality statistics. All the [global](http://www.chartjs.org/docs/#getting-started-global-chart-configuration) and [bar chart-specific options](http://www.chartjs.org/docs/#bar-chart-chart-options) that Chart.js uses can be specified to further customize the graph.

```javascript
var citycontext = require('citycontext-ui');
citycontext.chartsOptions.global.showScale = false; // global option
citycontext.chartsOptions.Bar.barShowStroke = false; // bar chart-specific option
citycontext.CriminalityWidget('#criminality-widget').render();
```

# Hooking into events

The widgets trigger events that you can hook into, whenever someone submits a postcode, whenever the lookup succeeds and when it fails.

```javascript
var citycontext = require('citycontext-ui');
citycontext.CriminalityWidget('#criminality-widget').render();

var widget = document.querySelector('#criminality-widget');

widget.addEventListener('citycontext-ui.submit', function(e) {
  console.info("Query submitted: " + e.detail.input);
});

widget.addEventListener('citycontext-ui.success', function(e) {
  console.info("Query succeeded: " + e.detail.input);
});

widget.addEventListener('citycontext-ui.error', function(e) {
  console.error("Query failed for " + e.detail.input + ". Error: " + e.detail.error);
});
```

# Development

```bash
git clone https://github.com/citycontext/citycontext-ui
cd citycontext-ui
make
```
