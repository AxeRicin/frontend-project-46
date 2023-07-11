import _ from 'lodash';

const getIndented = (depth, shiftLeft = 2) => {
  const indent = ' ';
  const numberOfIndents = 4;
  return indent.repeat(depth * numberOfIndents - shiftLeft);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${getIndented(depth, 0)}${key}: ${stringify(value, depth + 1)}`, '');
  return `{\n${result.join('\n')}\n${getIndented(depth, 4)}}`;
};

const getStylishFormat = (diff) => {
  const iter = (tree, depth = 1) => tree.reduce((acc, node, index) => {
    let string = '';
    switch (node.type) {
      case 'nested':
        string = `${acc}${getIndented(depth, 0)}${node.key}: ${iter(node.value, depth + 1)}\n`;
        break;

      case 'deleted':
        string = `${acc}${getIndented(depth)}- ${node.key}: ${stringify(node.value, depth + 1).trim()}\n`;
        break;

      case 'added':
        string = `${acc}${getIndented(depth)}+ ${node.key}: ${stringify(node.value, depth + 1).trim()}\n`;
        break;

      case 'changed': {
        const del = `${acc}${getIndented(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1).trim()}\n`;
        const add = `${getIndented(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1).trim()}\n`;
        string = del + add;
        break;
      }
      case 'unchanged':
        string = `${acc}${getIndented(depth, 0)}${node.key}: ${stringify(node.value, depth + 1).trim()}\n`;
        break;
      default:
        throw new Error(`Неверный тип узла: ${node.type}`);
    }
    if (index === tree.length - 1) {
      return `${string}${getIndented(depth - 1, 0)}}`;
    }
    return string;
  }, '{\n');
  return iter(diff);
};

export default getStylishFormat;
