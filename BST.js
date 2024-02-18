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

  delete(value) {
    this.root = deleteRec(value, this.root);
    function deleteRec(value, root) {
      if (root === null) return;
      if (root.data === value) {
        if (root.left === null && root.right === null) {
          return null;
        } else if (root.data === value && root.left === null) {
          return root.right;
        } else if (root.data === value && root.right === null) {
          return root.left;
        } else {
          let parent = root;
          let next = root.right;
          while (next.left !== null) {
            parent = next;
            next = next.left;
          }
          if (parent !== root) {
            parent.left = next.right;
          } else {
            parent.right = next.right;
          }
          root.data = next.data;
          return root;
        }
      } else {
        if (root.data > value && root.left) {
          root.left = deleteRec(value, root.left);
        } else if (root.data < value && root.right) {
          root.right = deleteRec(value, root.right);
        }
      }
      return root;
    }
    return this.root;
  }
  find(value) {
    let node = findRec(value, this.root);
    function findRec(value, root) {
      if (root.data === value) return root;
      else {
        if (root.data > value && root.left) {
          return findRec(value, root.left);
        } else if (root.data < value && root.right) {
          return findRec(value, root.right);
        } else return null;
      }
    }
    return node;
  }
  levelOrder(callback) {
    if (!this.root) {
      return [];
    }
    let result = [];
    const queue = [this.root];
    let n = 0;
    while (queue.length) {
      const currentNode = queue.shift();
      callback
        ? callback(currentNode.data, n++)
        : result.push(currentNode.data);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return result;
  }

  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  reBalance() {}
}

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
tree.insert(0);
tree.delete(8);
tree.delete(4);
tree.delete(67);
tree.delete(270);
// console.dir(tree.root, { depth: null });
prettyPrint(tree.root);
// console.log(tree.find(10));
// console.log(tree.find(1000));
// tree.levelOrder(print);
// function print(node, n) {
//   console.log(`Node ${n}: ${node}`);
// }
// console.log(tree.levelOrder());
// tree.inOrder();
// tree.preOrder();
// tree.postOrder();
