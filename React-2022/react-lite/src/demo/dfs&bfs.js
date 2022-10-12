/**
 * dfs: 深度优先遍历, 前中后序(指的是根节点所在的输出位置)
 * bfs: 广度优先遍历, 层序
 */

const tree = {
  value: 'A',
  left: {
    value: 'B1',
    left: {
      value: 'C1',
      left: null,
      right: null
    },
    right: {
      value: 'C2',
      left: null,
      right: null
    }
  },
  right: {
    value: 'B2',
    left: {
      value: 'C3',
      left: null,
      right: null
    },
    right: {
      value: 'C4',
      left: null,
      right: null
    }
  }
};

function dfs(node) {
  console.log('dfs', node.value);
  node.left && dfs(node.left);
  node.right && dfs(node.right);
}

function bfs(node) {
  const queue = [node];

  while (queue.length > 0) {
    const first = queue.shift();
    console.log('bfs', first.value);
    first.left && queue.push(first.left);
    first.right && queue.push(first.right);
  }
}

dfs(tree);
