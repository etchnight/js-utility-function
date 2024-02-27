"use strict";
//.js 主函数 exec()示例代码
/*function exec() {
  var localName = quickerGetVar("text"); // 读取text变量值, (text 是动作里的变量)
  quickerSetVar("text", "Hello, " + localName); //输出修改后的值到text变量中。
  return 0; //返回0表示成功。返回其他数字表示失败。
}*/

export class Quicker {
  public quicker = {};
  public quickerGetVar = this.quickerGetVar2.bind(this);
  public quickerSetVar = this.quickerSetVar2.bind(this);
  //获取quicker变量，用于与quicker格式一致（使用全局变量）
  private quickerGetVar2(varName: string) {
    return this.quicker[varName]; //也可使用eval运行varName文本
  }
  //写入quicker变量，用于与quicker格式一致(实际是写入全局变量)
  private quickerSetVar2(varName: string, varValue: any) {
    if (!this.quicker) {
      this.quicker = {};
    }
    this.quicker[varName] = varValue;
    console.log(varName, varValue);
    return varValue;
  }
}

//module.exports = { quickerGetVar, quickerSetVar };
