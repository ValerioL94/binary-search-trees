import Tree from './BST.js';

let array = randomArr(20);
function randomArr(n) {
  let randomArr = [];
  for (let i = 0; i < n; i++) {
    randomArr.push(Math.floor(Math.random() * 100) + 1);
  }
  return randomArr;
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

const tree = new Tree(array);
prettyPrint(tree.root);

console.log(tree.isBalanced());
console.log(
  tree.levelOrder(),
  tree.preOrder(),
  tree.postOrder(),
  tree.inOrder()
);

tree.insert(113);
tree.insert(240);
tree.insert(593);

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.reBalance();

prettyPrint(tree.root);

console.log(tree.isBalanced());

console.log(
  tree.levelOrder(),
  tree.preOrder(),
  tree.postOrder(),
  tree.inOrder()
);
