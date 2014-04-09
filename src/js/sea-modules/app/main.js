define(function (require, exports, module) {
  var Backbone = require('backbone');
  var $ = require('zepto');
  var app = require('app/core/app');
  var route = require('app/route');

  Backbone.$ = $;

  app.loadRoute(route);
  app.start();

  var views = {
    'city.search': require('app/view/city').search
  };
  require('app/core/view').render(views);

  window.app = app;

  console.log(app);

});
