class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    const sortedArray = sortFilter(array);
    const balancedBST = sortedArrayToBST(
      sortedArray,
      0,
      sortedArray.length - 1
    );
    return balancedBST;

    function sortFilter(array) {
      return array
        .sort((a, b) => {
          return a - b;
        })
        .filter((num, index) => {
          return array.indexOf(num) === index;
        });
    }
    function sortedArrayToBST(arr, start, end) {
      if (start > end) {
        return null;
      }
      let mid = parseInt((start + end) / 2);
      let node = new Node(arr[mid]);
      node.left = sortedArrayToBST(arr, start, mid - 1);
      node.right = sortedArrayToBST(arr, mid + 1, end);
      return node;
    }
  }
  insert(value) {
    this.root = insertRec(value, this.root);
    function insertRec(value, root) {
      if (root === null) return (root = new Node(value));
      if (root.data === value) return root;
      if (root.data > value) {
        root.left = insertRec(value, root.left);
      } else if (root.data < value) {
        root.right = insertRec(value, root.right);
      }
      return root;
    }
    return this.root;
  }

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
// prettyPrint(tree.root);
tree.insert(2);
tree.insert(6);
tree.insert(10);
tree.insert(40);
tree.insert(270);
tree.insert(555);
tree.insert(999);
console.dir(tree.root, { depth: null });
prettyPrint(tree.root);
