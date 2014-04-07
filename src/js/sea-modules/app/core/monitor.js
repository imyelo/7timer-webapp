define(function (require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  // 保留键名
  var __reserved__ = ['all'];

  // 检查保留键名冲突
  var checkReserved = function (key) {
    if (_.contains(__reserved__, key)) {
      throw new Error('the key is reserved');
    }
  };

  var Monitor = function (namespace) {
    this._base = {
      set: function (key, value) {
        // replace it
      },
      get: function (key) {
        // replace it
      },
      clear: function (key) {
        // replace it
      },
      all: function () {
        // replace it
      }
    };
    return this;
  };

  _.extend(Monitor.prototype, Backbone.Events, {
    set: function (key, val, options) {
      var previous;
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      previous = this._base.get(key);
      this._base.set(key, val);
      if (!options.silent) {
        if (!_.isEqual(previous, val)) {
          this.trigger('change', key, val, previous);
          this.trigger('change:' + key, val, previous);
        }
        this.trigger('set', key, val);
        this.trigger('set:' + key, val);
      }
      return this;
    },
    get: function (key, options) {
      var val;
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      val = this._base.get(key);
      if (!options.silent) {
        this.trigger('get', key, val);
        this.trigger('get:' + key, val);
      }
      return val;
    },
    clear: function (key, options) {
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      if (arguments.length === 0) {
        this._base.clear();
        if (!options.silent) {
          this.trigger('clear', 'all');
          this.trigger('clear:all');
        }
      } else {
        this._base.clear(key);
        if (!options.silent) {
          this.trigger('clear', key);
          this.trigger('clear:' + key);
        }
      }
      return this;
    },
    all: function (options) {
      var dicts = this._base.all();
      _.defaults((options || (options = {})), {silent: false});
      if (!options.silent) {
        this.trigger('get', 'all', dicts);
        this.trigger('get:all', dicts);
      }
      return dicts;
    }
  });
  
  return Monitor;
});