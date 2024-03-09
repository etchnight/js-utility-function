const DEFAULT_CONFIG = {
  id: "id",
  children: "children",
  pid: "pid",
};
type Config = typeof DEFAULT_CONFIG;
type Tree = {
  [key: string]: any;
};
export class TreeTools {
  public config: Config;
  constructor(config: Partial<Config> = {}) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
  }

  /**
   * @returns 将在原类型中添加类 children 属性，需要使用 as 关键字指明类型
   */
  public fromList = <T extends Tree>(list: T[]) => {
    /**
     * 键值对为 节点id : 节点对象
     */
    const nodeMap: Map<string, any> = new Map();
    let result: (T & {
      [key: string]: any;
    })[] = [];
    const { id, children, pid } = this.config;
    for (const node of list) {
      //@ts-ignore
      node[children] = node[children] || []; //todo 改变了node
      nodeMap.set(node[id], node);
    }
    for (const node of list) {
      const parent = nodeMap.get(node[pid]);
      (parent ? parent[children] : result).push(node);
    }
    return result;
  };

  public toList = <T extends Tree>(tree: T[]) => {
    const { children } = this.config;
    const result = [...tree];
    for (let i = 0; i < result.length; i++) {
      if (!result[i][children]) continue;
      result.splice(i + 1, 0, ...result[i][children]);
    }
    return result;
  };

  /**
   * 广度优先
   */
  public findNode = <T extends Tree>(tree: T[], func: (node: T) => boolean) => {
    const { children } = this.config;
    const list = [...tree];
    for (let node of list) {
      if (func(node)) return node;
      node[children] && list.push(...node[children]);
    }
    return null;
  };
  public findNodeAll = <T extends Tree>(
    tree: T[],
    func: (node: T) => boolean
  ) => {
    const { children } = this.config;
    const list = [...tree];
    const result = [];
    for (let node of list) {
      func(node) && result.push(node);
      node[children] && list.push(...node[children]);
    }
    return result;
  };

  public findPath = <T extends Tree>(tree: T[], func: (node: T) => boolean) => {
    const path = [];
    const list = [...tree];
    const visitedSet = new Set();
    const { children } = this.config;
    while (list.length) {
      const node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift(...node[children]);
        path.push(node);
        if (func(node)) return path;
      }
    }
    return null;
  };

  public findPathAll = <T extends Tree>(
    tree: T[],
    func: (node: T) => boolean
  ) => {
    const path = [],
      list = [...tree],
      result = [];
    const visitedSet = new Set(),
      { children } = this.config;
    while (list.length) {
      const node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift(...node[children]);
        path.push(node);
        func(node) && result.push([...path]);
      }
    }
    return result;
  };

  //todo
  public filter = <T extends Tree>(tree: T[], func: (node: T) => boolean) => {
    const { children } = this.config;
    function listFilter(list: T[]) {
      return list
        .map((node) => ({ ...node }))
        .filter((node) => {
          //@ts-ignore
          node[children] = node[children] && listFilter(node[children]); //todo 改变了node
          return func(node) || (node[children] && node[children].length);
        });
    }
    return listFilter(tree);
  };

  /**
   * 深度优先先序遍历
   */
  public forEach = <T extends Tree | Element>(
    tree: T[],
    func: (node: T) => void
  ) => {
    const list = [...tree];
    let children: string;
    try {
      children =
        typeof window && tree instanceof Element
          ? "children"
          : this.config.children;
    } catch (e) {
      children = this.config.children;
    }

    for (let i = 0; i < list.length; i++) {
      func(list[i]);
      //@ts-ignore
      list[i][children] && list.splice(i + 1, 0, ...list[i][children]);
    }
    return tree;
  };

  /**
   *
   * @param childrenKey map生成树的children属性的键名
   */
  public map = <T extends Tree, U extends Tree>(
    tree: T[],
    func: (node: T) => U,
    childrenKey: string
  ) => {
    const list = [...tree];
    let id = 1;
    const newObj = (pid: number) => {
      return {
        id: id++,
        result: {} as Tree,
        pid: pid,
      };
    };
    let resultList = list.map(() => newObj(0));
    //let resultList: U[] = [...result];
    const { children } = this.config;
    for (let i = 0; i < list.length; i++) {
      resultList[i].result = func(list[i]);
      if (list[i][children]) {
        list.splice(i + 1, 0, ...list[i][children]);
        resultList.splice(
          i + 1,
          0,
          ...list[i][children].map(() => newObj(resultList[i].id))
        );
      }
    }
    const nodeMap: Map<string, any> = new Map();
    let result: U[] = [];
    for (const node of resultList) {
      node.result[childrenKey] = node.result[childrenKey] || []; //todo 改变了node
      nodeMap.set(`${node.id}`, node.result);
    }
    console.log(nodeMap);
    for (const node of resultList) {
      const parent = nodeMap.get(`${node.pid}`);
      (parent ? parent[childrenKey] : result).push(node.result);
    }
    return result;
  };

  private _insert = <T extends Tree>(
    tree: T[],
    node: T,
    targetNode: T,
    after: 0 | 1
  ) => {
    const { children } = this.config;
    function insert(list: T[]) {
      let idx = list.indexOf(node);
      idx < 0
        ? list.forEach((n) => insert(n[children] || []))
        : list.splice(idx + after, 0, targetNode);
    }
    insert(tree);
  };

  public insertBefore = <T extends Tree>(tree: T[], newNode: T, oldNode: T) => {
    this._insert(tree, oldNode, newNode, 0);
  };
  public insertAfter = <T extends Tree>(tree: T[], newNode: T, oldNode: T) => {
    this._insert(tree, oldNode, newNode, 1);
  };

  /**
   *
   * @param withChild 为false时，将会把删除节点的子级级别提升一级而非删除
   */
  public removeNode = <T extends Tree>(
    tree: T[],
    func: (node: T) => boolean,
    withChild = true
  ) => {
    const { children } = this.config;
    const list = [tree];
    while (list.length) {
      const nodeList = list.shift();
      if (!nodeList) {
        break;
      }
      const delList = nodeList.reduce(
        (r, n, idx) => (func(n) && r.push(idx), r),
        [] as number[]
      );
      delList.reverse();
      delList.forEach((idx) => {
        if (withChild) {
          nodeList.splice(idx, 1);
        } else if (nodeList[idx].children) {
          console.log(nodeList[idx].children);
          nodeList.splice(idx, 1, ...nodeList[idx].children);
        }
      });
      const childrenList = nodeList
        .map((n) => n[children])
        .filter((l) => l && l.length);
      list.push(...childrenList);
    }
  };
}
/** 
const makeHandlers = () => {
  const obj = {};
  for (let key in tools) {
    if (key.startsWith("_")) continue;
    obj[key] = tools[key];
  }
  return obj;
};

const handlers = makeHandlers();

export const treeHandler = {
  ...handlers,
  createInstance(config) {
    const obj = {};
    for (const key in handlers) {
      const func = handlers[key];
      obj[key] = (...args) => func(...args, config);
    }
    return obj;
  },
};


if (typeof module == "undefined" && typeof window != "undefined") {
  window.treeTool = treeHandler;
} else {
  module.exports = treeHandler;
}
*/
