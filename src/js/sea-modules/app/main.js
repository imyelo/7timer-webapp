define(function (require, exports, module) {
  var Backbone = require('backbone');
  var $ = require('zepto');
  var app = require('app/core/app');

  Backbone.$ = $;

  app.start();

  window.app = app;

  console.log(app);

});
