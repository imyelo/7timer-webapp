define(function (require, exports, module) {
  var dao = require('app/core/dao');
  var Model = dao.Model;
  var Collection = dao.Collection;

  // http://www.7timer.com/v4/doc.php#civil
  var CivilModel = Model.extend({
    defaults:   {
      // 时间点
      "timepoint" : 3,
      // 云量
      "cloudcover" : 6,
      // 抬升指数
      "lifted_index" : 2,
      // 降水类型
      "prec_type" : "none",
      // 降水强度
      "prec_amount" : 1,
      // 两米温度
      "temp2m" : 23,
      // 两米相对湿度
      "rh2m" : "78%",
      // 十米风
      "wind10m" : {
        // 风向
        "direction" : "E",
        // 风速
        "speed" : 3
      },
      // 天气类型
      "weather" : "mcloudyday"
    },
    getTimepoint: function (init, shift) {
      return init + this.timepoint + shift;
    },
    getLifted: function () {
      return {
        '-10': '小于-7',
        '-6': '-7至-5',
        '-4': '-5至-3',
        '-1': '-3至0',
        '2': '0至4',
        '6': '4至8',
        '10': '8至11',
        '15': '大于11'
      }[this.lift_index];
    },
    getCloudCover: function () {
      return {
        '1': '0%-6%',
        '2': '6%-19%',
        '3': '19%-31%',
        '4': '31%-44%',
        '5': '44%-56%',
        '6': '56%-69%',
        '7': '69%-81%',
        '8': '81%-94%',
        '9': '94%-100%'
      }[this.cloudcover];
    },
    getPrecType: function () {
      return {
        'snow': '雪',
        'rain': '雨',
        'frzr': '冻雨',
        'icep': '冰粒',
        'none': '无'
      }[this.prec_type];
    },
  });

  var CivilList = Collection.extend({
    url: 'http://www.7timer.com/v4/bin/api.pl?lon=114.058&lat=22.543&product=civil&output=json',
    mock: require('test/mock/cinema.json'),

  });

  var civilDaos = {};
  civilDaos.getList = function () {
    return new CivilList();
  };
  


});
