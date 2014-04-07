define(function (require, exports, module) {

  var getShift = function (lon) {
    // 所在时区 时区经度范围 授时经度线
    // 零时区 7.5°W～7.5°E 0°
    // 东一区 7.5°E～22.5°E 15°E
    // 东二区 22.5°E～37.5°E 30°E
    // 东三区 37.5°E～52.5°E 45°E
    // 东四区 52.5°E～67.5°E 60°E
    // 东五区 67.5°E～82.5°E 75°E
    // 东六区 82.5°E～97.5°E 90°E
    // 东七区 97.5°E～112.5°E 105°E
    // 东八区 112.5°E～127.5°E 120°E
    // 东九区 127.5°E～142.5°E 135°E
    // 东十区 142.5°E～157.5°E 150°E
    // 东十一区 157.5°E～172.5°E 165°E
    // 东十二区 172.5°E～180° 180°
    // 西十二区 180°W～172.5°W 180°
    // 西十一区 172.5°W～157.5°W 165°W
    // 西十区 157.5°W～142.5°W 150°W
    // 西九区 142.5°W～127.5°W 135°W
    // 西八区 127.5°W～112.5°W 120°W
    // 西七区 112.5°W～97.5°W 105°W
    // 西六区 97.5°W～82.5°W 90°W
    // 西五区 82.5°W～67.5°W 75°W
    // 西四区 67.5°W～52.5°W 60°W
    // 西三区 52.5°W～37.5°W 45°W
    // 西二区 37.5°W～22.5°W 30°W
    // 西一区 22.5°W～7.5°W 15°W
    return Math.floor((lon + 7.5) / 15) % 12;
  };

});