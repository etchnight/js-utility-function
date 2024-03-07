"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.regexp.to-string.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTools = void 0;
var DEFAULT_CONFIG = {
  id: "id",
  children: "children",
  pid: "pid"
};
var TreeTools = /*#__PURE__*/_createClass(function TreeTools() {
  var _this = this;
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, TreeTools);
  /**
   * @returns 将在原类型中添加类 children 属性，需要使用 as 关键字指明类型
   */
  this.fromList = function (list) {
    /**
     * 键值对为 节点id : 节点对象
     */
    var nodeMap = new Map();
    var result = [];
    var _this$config = _this.config,
      id = _this$config.id,
      children = _this$config.children,
      pid = _this$config.pid;
    var _iterator = _createForOfIteratorHelper(list),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        //@ts-ignore
        node[children] = node[children] || []; //todo 改变了node
        nodeMap.set(node[id], node);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(list),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _node = _step2.value;
        var parent = nodeMap.get(_node[pid]);
        (parent ? parent[children] : result).push(_node);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return result;
  };
  this.toList = function (tree) {
    var children = _this.config.children;
    var result = _toConsumableArray(tree);
    for (var i = 0; i < result.length; i++) {
      if (!result[i][children]) continue;
      result.splice.apply(result, [i + 1, 0].concat(_toConsumableArray(result[i][children])));
    }
    return result;
  };
  /**
   * 广度优先
   */
  this.findNode = function (tree, func) {
    var children = _this.config.children;
    var list = _toConsumableArray(tree);
    var _iterator3 = _createForOfIteratorHelper(list),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var node = _step3.value;
        if (func(node)) return node;
        node[children] && list.push.apply(list, _toConsumableArray(node[children]));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return null;
  };
  this.findNodeAll = function (tree, func) {
    var children = _this.config.children;
    var list = _toConsumableArray(tree);
    var result = [];
    var _iterator4 = _createForOfIteratorHelper(list),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var node = _step4.value;
        func(node) && result.push(node);
        node[children] && list.push.apply(list, _toConsumableArray(node[children]));
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return result;
  };
  this.findPath = function (tree, func) {
    var path = [];
    var list = _toConsumableArray(tree);
    var visitedSet = new Set();
    var children = _this.config.children;
    while (list.length) {
      var node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift.apply(list, _toConsumableArray(node[children]));
        path.push(node);
        if (func(node)) return path;
      }
    }
    return null;
  };
  this.findPathAll = function (tree, func) {
    var path = [],
      list = _toConsumableArray(tree),
      result = [];
    var visitedSet = new Set(),
      children = _this.config.children;
    while (list.length) {
      var node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift.apply(list, _toConsumableArray(node[children]));
        path.push(node);
        func(node) && result.push([].concat(path));
      }
    }
    return result;
  };
  //todo
  this.filter = function (tree, func) {
    var children = _this.config.children;
    function listFilter(list) {
      return list.map(function (node) {
        return Object.assign({}, node);
      }).filter(function (node) {
        //@ts-ignore
        node[children] = node[children] && listFilter(node[children]); //todo 改变了node
        return func(node) || node[children] && node[children].length;
      });
    }
    return listFilter(tree);
  };
  this.forEach = function (tree, func) {
    var list = _toConsumableArray(tree);
    var children = tree instanceof Element ? "children" : _this.config.children;
    for (var i = 0; i < list.length; i++) {
      func(list[i]);
      //@ts-ignore
      list[i][children] && list.splice.apply(list, [i + 1, 0].concat(_toConsumableArray(list[i][children])));
    }
    return tree;
  };
  /**
   *
   * @param childrenKey map生成树的children属性的键名
   */
  this.map = function (tree, func, childrenKey) {
    var list = _toConsumableArray(tree);
    var id = 1;
    var newObj = function newObj(pid) {
      return {
        id: id++,
        result: {},
        pid: pid
      };
    };
    var resultList = list.map(function () {
      return newObj(0);
    });
    //let resultList: U[] = [...result];
    var children = _this.config.children;
    var _loop = function _loop(i) {
      resultList[i].result = func(list[i]);
      if (list[i][children]) {
        list.splice.apply(list, [i + 1, 0].concat(_toConsumableArray(list[i][children])));
        resultList.splice.apply(resultList, [i + 1, 0].concat(_toConsumableArray(list[i][children].map(function () {
          return newObj(resultList[i].id);
        }))));
      }
    };
    for (var i = 0; i < list.length; i++) {
      _loop(i);
    }
    var nodeMap = new Map();
    var result = [];
    var _iterator5 = _createForOfIteratorHelper(resultList),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var node = _step5.value;
        node.result[childrenKey] = node.result[childrenKey] || []; //todo 改变了node
        nodeMap.set("".concat(node.id), node.result);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    console.log(nodeMap);
    var _iterator6 = _createForOfIteratorHelper(resultList),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _node2 = _step6.value;
        var parent = nodeMap.get("".concat(_node2.pid));
        (parent ? parent[childrenKey] : result).push(_node2.result);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return result;
  };
  this._insert = function (tree, node, targetNode, after) {
    var children = _this.config.children;
    function insert(list) {
      var idx = list.indexOf(node);
      idx < 0 ? list.forEach(function (n) {
        return insert(n[children] || []);
      }) : list.splice(idx + after, 0, targetNode);
    }
    insert(tree);
  };
  this.insertBefore = function (tree, newNode, oldNode) {
    _this._insert(tree, oldNode, newNode, 0);
  };
  this.insertAfter = function (tree, newNode, oldNode) {
    _this._insert(tree, oldNode, newNode, 1);
  };
  /**
   *
   * @param withChild 为false时，将会把删除节点的子级级别提升一级而非删除
   */
  this.removeNode = function (tree, func) {
    var withChild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var children = _this.config.children;
    var list = [tree];
    var _loop2 = function _loop2() {
      var nodeList = list.shift();
      if (!nodeList) {
        return 1; // break
      }
      var delList = nodeList.reduce(function (r, n, idx) {
        return func(n) && r.push(idx), r;
      }, []);
      delList.reverse();
      delList.forEach(function (idx) {
        if (withChild) {
          nodeList.splice(idx, 1);
        } else if (nodeList[idx].children) {
          console.log(nodeList[idx].children);
          nodeList.splice.apply(nodeList, [idx, 1].concat(_toConsumableArray(nodeList[idx].children)));
        }
      });
      var childrenList = nodeList.map(function (n) {
        return n[children];
      }).filter(function (l) {
        return l && l.length;
      });
      list.push.apply(list, _toConsumableArray(childrenList));
    };
    while (list.length) {
      if (_loop2()) break;
    }
  };
  this.config = Object.assign({}, DEFAULT_CONFIG, config);
});
exports.TreeTools = TreeTools;
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