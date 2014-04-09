define(function (require, exports, module) {

  exports.enter = function () {
    var search = require('app/view/city').search;
    search(document.getElementById('main'));

  };

});