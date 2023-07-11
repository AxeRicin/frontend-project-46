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

const getStylishFormat = (diff, depth = 1) => {
  const lines = diff.reduce((acc, node) => {
    switch (node.type) {
      case 'nested':
        return [...acc, `${getIndented(depth, 0)}${node.key}: ${getStylishFormat(node.value, depth + 1)}`];

      case 'deleted':
        return [...acc, `${getIndented(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`];

      case 'added':
        return [...acc, `${getIndented(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`];

      case 'changed': {
        const del = `${getIndented(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
        const add = `\n${getIndented(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        return [...acc, del + add];
      }
      case 'unchanged':
        return [...acc, `${getIndented(depth, 0)}${node.key}: ${stringify(node.value, depth + 1)}`];
      default:
        throw new Error(`Неверный тип узла: ${node.type}`);
    }
  }, []);
  return `{\n${lines.join('\n')}\n${getIndented(depth - 1, 0)}}`;
};

export default getStylishFormat;
