class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    const sortedArray = this.sortFilter(array);
    const balancedBST = this.sortedArrayToBST(
      sortedArray,
      0,
      sortedArray.length - 1
    );
    return balancedBST;
  }
  sortFilter(array) {
    return array
      .sort((a, b) => {
        return a - b;
      })
      .filter((num, index) => {
        return array.indexOf(num) === index;
      });
  }
  sortedArrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.sortedArrayToBST(arr, start, mid - 1);
    node.right = this.sortedArrayToBST(arr, mid + 1, end);
    return node;
  }
  insert(value) {}
  delete(value) {}
  find(value) {}
  levelOrder(callback) {}
  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  reBalance() {}
}

// node = root
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 645, 324];
const tree = new Tree(test);
// console.dir(tree.root, { depth: null });
prettyPrint(tree.root);
