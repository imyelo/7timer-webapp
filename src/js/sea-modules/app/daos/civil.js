define(function (require, exports, module) {
  var daos = require('app/core/daos');
  var Model = daos.Model;
  var Collection = daos.Collection;

  var CivilList = Collection.extend({
    mock: require('test/mock/cinema.json')
  });

  var civilDaos = {};
  civilDaos.getList = function () {
    return new CivilList();
  };
  


});
