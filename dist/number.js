"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chineseToNum = exports.numtoChinese = void 0;
/**
 * @description  将数字（整数）转为汉字，从零到一亿亿
 * https://juejin.cn/post/6892372242143903758
 */
function numtoChinese(num) {
    let chNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let units = [
        "",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿",
    ]; //可继续追加更高位转换值
    if (!num || isNaN(num)) {
        return "零";
    }
    let english = num.toString().split("");
    let result = "";
    for (let i = 0; i < english.length; i++) {
        let des_i = english.length - 1 - i; //倒序排列设值
        result = units[i] + result;
        let arr1_index = english[des_i];
        result = chNums[parseInt(arr1_index)] + result;
    }
    //将【零千、零百】换成【零】 【十零】换成【十】
    result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
    //合并中间多个零为一个零
    result = result.replace(/零+/g, "零");
    //将【零亿】换成【亿】【零万】换成【万】
    result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
    //将【亿万】换成【亿】
    result = result.replace(/亿万/g, "亿");
    //移除末尾的零
    result = result.replace(/零+$/, "");
    //将【零一十】换成【零十】
    //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
    //将【一十】换成【十】
    result = result.replace(/^一十/g, "十");
    return result;
}
exports.numtoChinese = numtoChinese;
/**
 * https://blog.csdn.net/weixin_48888726/article/details/127774053
 * @param chnStr
 * @returns
 */
function chineseToNum(chnStr) {
    var _a, _b;
    let chnNumChar = {
        零: 0,
        一: 1,
        二: 2,
        两: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9,
    };
    let chnNameValue = {
        十: { value: 10, secUnit: false },
        百: { value: 100, secUnit: false },
        千: { value: 1000, secUnit: false },
        万: { value: 10000, secUnit: true },
        亿: { value: 100000000, secUnit: true },
    };
    let rtn = 0;
    let section = 0;
    let number = 0;
    let secUnit = false;
    let str = chnStr.split("");
    for (let i = 0; i < str.length; i++) {
        let num = chnNumChar[str[i]];
        if (typeof num !== "undefined") {
            number = num;
            if (i === str.length - 1) {
                section += number;
            }
        }
        else {
            let unit = (_a = chnNameValue[str[i]]) === null || _a === void 0 ? void 0 : _a.value;
            secUnit = (_b = chnNameValue[str[i]]) === null || _b === void 0 ? void 0 : _b.secUnit;
            if (unit) {
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }
                else {
                    section += number * unit;
                }
            }
            number = 0;
        }
    }
    return rtn + section;
}
exports.chineseToNum = chineseToNum;
