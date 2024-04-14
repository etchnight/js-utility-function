"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
//https://blog.csdn.net/weixin_49229262/article/details/116867763
/**
 * 获取元素所有样式
 * @param ele
 * @param pseudoEle
 * @returns
 * todo div等选择器定义的没有添加
 * todo 伪类样式
 */
function getStyle(ele, pseudoEle) {
  /**element不为空 */
  if (!ele) return;
  /**获取伪类样式 */
  if (pseudoEle) {
    console.log("伪类样式暂不支持");
    return;
  }
  /**创建空标签并渲染到页面 */
  var initTag = document.createElement(ele.tagName);
  document.body.appendChild(initTag);
  /**获取两标签样式 */
  var initTagStyle = getComputedStyle(initTag);
  var currEleStyle = getComputedStyle(ele);
  /**获取行内样式*/
  var currEleInline = ele.style;
  /**过滤无用标签和行内标签并重新合并 */
  var styles = filterObj(currEleStyle, initTagStyle, currEleInline);
  initTag.remove();
  return styles;
  /**驼峰转标准 */
  function toLowerLine(str) {
    var temp = str.replace(/[A-Z]/g, function (match) {
      return "-" + match.toLowerCase();
    });
    if (temp.slice(0, 6) === "webkit") {
      temp = "-" + temp;
    }
    return temp;
  }
  function filterObj(currObj, initObj, style) {
    var currEleArr = Object.keys(currObj);
    var newObj = {};
    var temp;
    for (var _i = 1; _i < currEleArr.length; _i++) {
      if (currObj[currEleArr[_i]] !== initObj[currEleArr[_i]]) {
        /**大写转小写 */
        temp = toLowerLine(currEleArr[_i]);
        Object.defineProperty(newObj, temp, {
          value: currObj[currEleArr[_i]],
          configurable: true
        });
      }
    }
    /**包装行内标签 */
    var i = 0;
    while (true) {
      if (!style[i] || i > 99999) break;
      delete newObj[style[i]];
      i++;
    }
    //newObj.inlineStyle = style.cssText;
    return newObj;
  }
}
/**
 * getStyle衍生方法，将所有属性设置为内联属性
 */
function toInlineStyle(selector) {
  var ele = document.querySelector(selector);
  ele = ele.cloneNode(true);
  document.body.appendChild(ele);
  if (!ele) {
    return;
  }
  var style = getStyle(ele);
  var cssText = "";
  for (var _i2 = 0, _Object$keys = Object.keys(style); _i2 < _Object$keys.length; _i2++) {
    var key = _Object$keys[_i2];
    cssText += " ".concat(key, ": ").concat(style[key], ";");
  }
  ele.setAttribute("style", cssText);
  var html = ele.outerHTML;
  ele.remove();
  return html;
}