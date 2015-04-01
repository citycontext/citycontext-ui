/* global phantom */

var page = require('webpage').create();
var pagePath = phantom.libraryPath + '/stub.html';
var scriptPath = phantom.libraryPath + '/build/test.js';

page.open(pagePath, function () {
  page.onConsoleMessage = function(msg) {
    console.log(msg);
    if (msg === '# ok') {
      phantom.exit(0);
    } else if (msg.match(/^# fail/)) {
      phantom.exit(1);
    }
  };

  page.onError = function(msg, trace) {
      var msgStack = [msg];
      if (trace && trace.length) {
        trace.forEach(function(t) {
          msgStack.push(t.file + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
        });
      }
      console.error(msgStack.join('\n'));
      phantom.exit(1);
  };


  page.includeJs(scriptPath);
});
