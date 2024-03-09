"use strict";
import { Quicker } from "./quicker";
import { TreeTools } from "./src/tree";

let allVar = {
  input: [
    {
      id: "1",
      title: "节点1",
      children: [
        {
          id: "1-1",
          title: "节点1-1",
        },
        {
          id: "1-2",
          title: "节点1-2",
        },
      ],
    },
    {
      id: "2",
      title: "节点2",
      children: [
        {
          id: "2-1",
          title: "节点2-1",
          children: [
            {
              id: "2-1-1",
              title: "节点2-1-1",
            },
          ],
        },
      ],
    },
  ],
};
const quicker = new Quicker(allVar);

const quickerGetVar = quicker.quickerGetVar;
const quickerSetVar = quicker.quickerSetVar;

/**
 * quicker测试
 */
function exec() {
  var input = quickerGetVar("input") as typeof allVar.input; // 读取text变量值, (text 是动作里的变量)
  const treeTools = new TreeTools({ id: "id", pid: "parentId" });
  var output = treeTools.forEach(input, (e) => {
    console.log(e.id);
  });
  quickerSetVar("output", output); //输出修改后的值到text变量中。
  quickerSetVar("input", input); //输出修改后的值到text变量中。
  return 0; //返回0表示成功。返回其他数字表示失败。
}

exec();
