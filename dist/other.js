"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseExample = exports.interruptByOut = exports.sleep = exports.Dev = void 0;
class Dev {
    //private thisBind;
    constructor(isDev) {
        this.isDev = true;
        this.log = (name, obj) => {
            if (this.isDev) {
                console.log(name, obj);
            }
        };
        this.isDev = isDev;
        //this.thisBind = thisBind;
        //this.log = this.log.bind(thisBind);
        //this.devMap = this.devMap.bind(thisBind);
    }
    devMap(list, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            if (this.isDev) {
                for (let item of list) {
                    result.push(yield cb(item));
                }
            }
            else {
                result = yield Promise.all(list.map(cb));
            }
            return result;
        });
    }
}
exports.Dev = Dev;
/**
 *
 * @param ms 毫秒
 * @returns
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
/**
 *
 * @deprecated 无法实现
 * @param fn 希望退出的函数
 * @param throwVar 控制退出的变量名
 * @param delay throwFn的执行间隔
 * @returns
 */
function interruptByOut(fn, throwVar, delay = 200) {
    return __awaiter(this, void 0, void 0, function* () {
        let intervalID;
        try {
            intervalID = setInterval(() => {
                const func = new Function(`if (${throwVar}) {
          console.log("退出");
          throw "interrupt";
        } else {
          console.log("不退出");
        }
      `);
                func();
            }, delay);
            yield fn();
            clearInterval(intervalID);
        }
        catch (e) {
            if (e === "interrupt") {
                clearInterval(intervalID);
                console.log("已提前退出");
                return;
            }
        }
    });
}
exports.interruptByOut = interruptByOut;
/**
 *
 * @param timeout
 * @param text
 * @returns
 */
const promiseExample = (timeout, text) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            console.log(text);
            resolve(text);
        }, timeout);
    });
};
exports.promiseExample = promiseExample;
