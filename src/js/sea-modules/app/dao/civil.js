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
      var time = init + this.get('timepoint') + shift;
      var result = {};
      result.year = time.slice(0, 4);
      result.month = time.slice(4, 6);
      result.day = time.slice(6, 8);
      result.hour = time.slice(8, 10);
      return result;
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
      }[this.get('lift_index')] || '';
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
      }[this.get('cloudcover')] || '';
    },
    getPrecType: function () {
      return {
        'snow': '雪',
        'rain': '雨',
        'frzr': '冻雨',
        'icep': '冰粒',
        'none': '无'
      }[this.get('prec_type')] || '';
    },
    getPrecAmount: function () {
      return {
        '0': '无',
        '1': '0-0.25毫米/小时',
        '2': '0.25-1毫米/小时',
        '3': '1-4毫米/小时',
        '4': '4-10毫米/小时',
        '5': '10-16毫米/小时',
        '6': '16-30毫米/小时',
        '7': '30-50毫米/小时',
        '8': '50-75毫米/小时',
        '9': '超过75毫米/小时';
      }[this.get('prec_amount')] || '';
    },
    getTemperature: function () {
      return this.get('temp2m') + '℃';
    },
    getHumidity: function () {
      return this.get('rh2m') + '%';
    },
    getWindDirection: function () {
      return {
        'N': '北',
        'NE': '东北',
        'E': '东',
        'SE': '东南',
        'S': '南',
        'SW': '西南',
        'W': '西',
        'NW': '西北'
      }[this.get('wind10m').diretion] || '';
    },
    getWindSpeed: function () {
      return {
        '1': '低于0.3米/秒（无风）',
        '2': '0.3-3.4米/秒（1-2级）',
        '3': '3.4-8.0米/秒（3-4级）',
        '4': '8.0-10.8米/秒（5级）',
        '5': '10.8-17.2米/秒（6-7级）',
        '6': '17.2-24.5米/秒（8-9级）',
        '7': '24.5-32.6米/秒（10-11级）',
        '8': '超过32.6米/秒（12级或以上）',
      }[this.get('wind10m').speed] || '';
    },
    getWeather: function () {
      return {
        'clearday': '总云量小于20%',
        'clearnight': '总云量小于20%',
        'pcloudyday': '总云量介于20%-60%间',
        'pcloudynight': '总云量介于20%-60%间',
        'mcloudyday': '总云量介于60%-80%间',
        'mcloudynight': '总云量介于60%-80%间',
        'cloudyday': '总云量超过80%',
        'cloudynight': '总云量超过80%',
        'humidday': '相对湿度超过90%且总云量小于60%',
        'humidnight': '相对湿度超过90%且总云量小于60%',
        'lightrainday': '降水强度小于4毫米/小时且总云量超过80%',
        'lightrainnight': '降水强度小于4毫米/小时且总云量超过80%',
        'oshowerday': '降水强度小于4毫米/小时且总云量介于60%-80%间',
        'oshowernight': '降水强度小于4毫米/小时且总云量介于60%-80%间',
        'ishowerday': '降水强度小于4毫米/小时且总云量小于60%',
        'ishowernight': '降水强度小于4毫米/小时且总云量小于60%',
        'lightsnowday': '降水强度小于4毫米/小时',
        'lightsnownight': '降水强度小于4毫米/小时',
        'rainday': '降水强度超过4毫米/小时',
        'rainnight': '降水强度超过4毫米/小时',
        'snowday': '降水强度超过4毫米/小时',
        'snownight': '降水强度超过4毫米/小时',
        'rainsnowday': '降水类型为冰粒或冻雨',
        'rainsnownight': '降水类型为冰粒或冻雨'
      }[this.get('weather')] || '';
    },
    getAll: function () {
      return {
        "timepoint" : this.getTimepoint(init, shift),
        "cloudcover" : this.getCloudCover(),
        "lifted" : this.getLifted(),
        "precType" : this.getPrecType(),
        "precAmount" : this.getPrecAmount(),
        "temperature" : this.getTemperature(),
        "humidity" : this.getHumidity(),
        "windDirection" : this.getWindDirection(),
        "windSpeed" : this.getWindSpeed(),
        "weather" : this.getWeather()
      };
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
