define(function (require, exports, module) {

  exports.enter = function () {
    var search = require('app/view/region/city').search;
    search(document.getElementById('main'));

  };

});