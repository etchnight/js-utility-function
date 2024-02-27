"use strict";

require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toChineseNum = void 0;
/**
 * @description - 将数字转换成中文大写的表示，处理到万级别
 * - 例如 toChineseNum(12345)，返回 一万二千三百四十五。
 */
function toChineseNum(num) {
  var getWan = function getWan(temp) {
    var changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var unit = ["", "十", "百", "千", "万"];
    var strArr = temp.toString().split("").reverse();
    var newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      var nowNum = "";
      if (i === 0 && strArr[i] === "0") {
        nowNum = "";
      } else if (i > 0 && strArr[i] === "0" && strArr[i - 1] === "0") {
        nowNum = "";
      } else {
        nowNum = changeNum[parseInt(strArr[i])] + (strArr[i] === "0" ? unit[0] : unit[i]);
      }
      newNum = nowNum + newNum;
    }
    return newNum;
  };
  var overWan = Math.floor(num / 10000);
  var noWan = num % 10000;
  /*if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }*/
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
exports.toChineseNum = toChineseNum;