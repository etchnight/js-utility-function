type Tree = {
  [key: string]: number | string | Tree;
};

export function findInTree<T extends Tree>(tree: T) {
  return tree;
}

let aaa = {
  b: "2",
};
findInTree(aaa);
