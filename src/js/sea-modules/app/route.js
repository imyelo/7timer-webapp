define(function (require, exports, module) {
  var ctrl = require('app/ctrl/index');
  var filter = require('app/filter/index');

  return function (route) {
    route
      // 入口
      ('', ctrl.main.enter)
      ('!', ctrl.main.enter)
      ('!/', ctrl.main.enter)

      // 民用预报
      ('!/civil/:city', ctrl.civil.one)

      // 城市列表
      ('!/city', ctrl.city.list)
      // 搜索城市
      ('!/city/search', ctrl.city.search)
      // 搜索城市 - 结果列表
      ('!/city/search/:name', ctrl.city.result)

      ;
  };
});