define(function (require, exports, module) {
  var config = require('app/config/app.json');
  var Store = require('./store');
  var Cache = require('./cache');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var use = require('./router').use;
  var getRouter = require('./router').getRouter;
  var routes = require('app/route');

  var App = function () {
    return this;
  };

  App.prototype.store = new Store(config.name || 'h5');

  App.prototype.cache = new Cache();

  App.prototype.start = function () {
    var Router;
    // load routes
    routes(use);
    Router = getRouter();
    new Router();
    Backbone.history.start();
  };

  return new App();
});