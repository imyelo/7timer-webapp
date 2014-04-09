define(function (require, exports, module) {
  var config = require('app/config/app.json');
  var Store = require('./store');
  var Cache = require('./cache');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var App = function () {
    return this;
  };

  App.prototype.store = new Store(config.name || 'h5');

  App.prototype.cache = new Cache();

  App.prototype.loadRoute = require('./router').load;

  App.prototype.loadView = require('./view').render;

  App.prototype.start = function () {
    Backbone.history.start();
  };

  return new App();
});