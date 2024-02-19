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
    if (!array) return;
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
      if (!root) return (root = new Node(value));
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
      if (!root) return;
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
    let n = 1;
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
  inOrder(callback) {
    let array = [];
    let n = 1;
    inOrderRec(this.root);
    function inOrderRec(root) {
      if (!root) return;
      inOrderRec(root.left);
      callback ? callback(root.data, n++) : array.push(root.data);
      inOrderRec(root.right);
    }
    return array;
  }
  preOrder(callback) {
    let array = [];
    let n = 1;
    preOrderRec(this.root);
    function preOrderRec(root) {
      if (!root) return;
      callback ? callback(root.data, n++) : array.push(root.data);
      preOrderRec(root.left);
      preOrderRec(root.right);
    }
    return array;
  }
  postOrder(callback) {
    let array = [];
    let n = 1;
    postOrderRec(this.root);
    function postOrderRec(root) {
      if (!root) return;
      postOrderRec(root.left);
      postOrderRec(root.right);
      callback ? callback(root.data, n++) : array.push(root.data);
    }
    return array;
  }
  height(node) {
    let currNode = this.find(node);
    return findHeight(currNode);
    function findHeight(node, height = 0, l, r) {
      if (!node) return null;
      if (!node.left && !node.right) return height;
      else {
        if (node.left) l = findHeight(node.left, height + 1);
        if (node.right) r = findHeight(node.right, height + 1);
        if (l && r) {
          if (l > r || l === r) return (height = l);
          else return (height = r);
        } else {
          if (l) return (height = l);
          if (r) return (height = r);
        }
      }
    }
  }
  depth(node) {
    return findDepth(node, this.root);
    function findDepth(node, root, depth = 0) {
      if (root.data === node) return depth;
      else {
        if (root.data > node && root.left) {
          return findDepth(node, root.left, depth + 1);
        } else if (root.data < node && root.right) {
          return findDepth(node, root.right, depth + 1);
        } else return null;
      }
    }
  }
  isBalanced() {}
  reBalance() {}
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (!node) {
    return;
  }
  if (node.right != null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left != null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 645, 324];
const tree = new Tree(test);
// prettyPrint(tree.root);
// console.dir(tree.root, { depth: null });
tree.insert(0);
tree.insert(10);
tree.insert(40);
tree.insert(270);
tree.insert(555);
tree.insert(888);
tree.insert(999);
// prettyPrint(tree.root);
// console.dir(tree.root, { depth: null });
tree.delete(0);
tree.delete(10);
tree.delete(40);
tree.delete(270);
tree.delete(555);
tree.delete(999);
tree.delete(10000);
// prettyPrint(tree.root);
// console.dir(tree.root, { depth: null });
// console.log(tree.find(23));
// console.log(tree.find(10000));

function print(node, n) {
  console.log(`Node ${n}: ${node}`);
}
// tree.levelOrder(print);
// console.log(tree.levelOrder());
// tree.inOrder(print);
// console.log(tree.inOrder());
// tree.preOrder(print);
// console.log(tree.preOrder());
// tree.postOrder(print);
// console.log(tree.postOrder());

prettyPrint(tree.root);

// console.log(tree.height(8));
// console.log(tree.height(67));
// console.log(tree.height(324));
// console.log(tree.height(645));
// console.log(tree.height(888));

console.log(tree.depth(8));
console.log(tree.depth(67));
console.log(tree.depth(324));
console.log(tree.depth(645));
console.log(tree.depth(888));
