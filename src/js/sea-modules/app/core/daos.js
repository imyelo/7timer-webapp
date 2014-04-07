define(function (require, exports, module) {
  var Backbone = require('backbone');
  var config = require('config/app.json');
  var Model = Backbone.Model.extend({
    fetch: function () {
      if (config.mock) {
        return this.mock;
      }
      return Backbone.Model.fetch.apply(this, arguments);
    };
  });
  var Collection = Backbone.Collection.extend({
    fetch: function () {
      if (config.mock) {
        return this.mock;
      }
      return Backbone.Collection.fetch.apply(this, arguments);
    };
  });
  exports.Model = Model;
  exports.Collection = Collection;
});
