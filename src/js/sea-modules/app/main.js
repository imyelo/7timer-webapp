define(function (require, exports, module) {
  var Backbone = require('backbone');
  var $ = require('zepto');
  var app = require('app/core/app');
  var route = require('app/route');
  var view = require('app/view');

  Backbone.$ = $;

  app.loadRoute(route);
  app.start();

  app.loadView(view);

  window.app = app;

  console.log(app);

});
