define(function (require, exports, module) {
  exports.login = function (next) {
    console.log('login filter');
    next();
  };
});