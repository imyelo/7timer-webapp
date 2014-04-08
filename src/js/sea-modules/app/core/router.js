define(function (require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var routes = [];
  // example: 
  //    use('path', filter.A, filter.B, controller.single);
  var use = function (path, filters, controller) {
    var args = _.toArray(arguments);
    routes.push({
      path: path,
      filters: args.slice(1, -1),
      ctrl: args[args.length - 1]
    });
    return use;
  };

  // 返回设置好的Backbone.Router
  var getRouter = function () {
    var setting = (function (combined) {
      var result = {};
      _.each(routes, function (route) {
        var path = route.path;
        var filters = route.filters;
        var ctrl = route.ctrl;
        result[path] = function () {
          var context = this;
          var args = _.toArray(arguments);
          var i = -1;
          var len = filters.length;
          var next = function () {
            if (++i < len) {
              filters[i].apply(context, [next].concat(args));
            } else {
              ctrl.apply(context, args);
            }
          };
          next();
        };
      });
      return result;
    })(routes);
    return Backbone.Router.extend({
      routes: setting
    });
  };

  var load = function (routes) {
    var Router;
    // load routes
    routes(use);
    Router = getRouter();
    new Router();
  };

  exports.use = use;
  exports.getRouter = getRouter;
  exports.load = load;
});
