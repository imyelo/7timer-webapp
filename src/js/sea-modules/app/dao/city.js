define(function (require, exports, module) {
  var _ = require('underscore');
  var $ = require('$');
  
  var getGPS = function (address, callback) {
    address = address.trim();
    var url = "http://maps.googleapis.com/maps/api/geocode/json";
    var data = {
      address: address.trim(),
      sensor: false
    };
    $.ajax({
      url: url,
      data: data,
      success: function(res) {
        callback(_.map(res.results, function (location) {
          return {
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng,
            prettyAddress: location.formatted_address
          };
        }));
      },
      dataType: 'json'
    });
  };

  exports.getGPS = getGPS;
});