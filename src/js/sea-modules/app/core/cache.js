define(function (require, exports, module) {
  var _ = require('underscore');
  var Monitor = require('./monitor');

  var Base = (function (_) {
    var Base = function () {
      this.data = {};
      return this;
    };
    Base.prototype.set = function (key, val) {
      this.data[key] = val;
      return this;
    };
    Base.prototype.get = function (key) {
      if (typeof key === 'undefined') {
        return this.data;
      } else {
        return this.data[key];
      }
    };
    Base.prototype.clear = function (key) {
      if (arguments.length === 0) {
        this.data = {};
        return this;
      } else {
        delete this.data[key];
        return this;
      }
    };
    Base.prototype.all = function () {
      return _.clone(this.data);
    };
    return Base;
  })(_);

  var Cache = function (namespace) {
    this._base = new Base();
    return this;
  };

  _.extend(Cache.prototype, Monitor.prototype);

  return Cache;
});
