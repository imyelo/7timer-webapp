define(function (require, exports, module) {
  var main = require('./main');
  var city = require('./city');
  var civil = require('./civil');

  exports.main = main;
  exports.city = city;
  exports.civil = civil;

});