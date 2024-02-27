"use strict";

/**
 * @description - 将数字转换成中文大写的表示，处理到万级别
 * - 例如 toChineseNum(12345)，返回 一万二千三百四十五。
 */
export function toChineseNum(num: number) {
  const getWan = (temp: number) => {
    const changeNum = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
    ];
    const unit = ["", "十", "百", "千", "万"];
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (let i = 0; i < strArr.length; i++) {
      let nowNum = "";
      if (i === 0 && strArr[i] === "0") {
        nowNum = "";
      } else if (i > 0 && strArr[i] === "0" && strArr[i - 1] === "0") {
        nowNum = "";
      } else {
        nowNum =
          changeNum[parseInt(strArr[i])] +
          (strArr[i] === "0" ? unit[0] : unit[i]);
      }
      newNum = nowNum + newNum;
    }
    return newNum;
  };
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  /*if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }*/
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
