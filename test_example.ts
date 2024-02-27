"use strict";
import { Quicker } from "./quicker";

const quicker = new Quicker();
const quickerGetVar = quicker.quickerGetVar;
const quickerSetVar = quicker.quickerSetVar;

//*初始赋值
quicker.quicker = {
  数字: 12345,
};

const somefunc = (input) => {
  return input;
};

/**
 * quicker用主函数
 */
function exec() {
  let input = quickerGetVar("text"); // 读取text变量值, (text 是动作里的变量)
  let output = somefunc(input);
  quickerSetVar("text", output); //输出修改后的值到text变量中。
  return 0; //返回0表示成功。返回其他数字表示失败。
}

exec();
