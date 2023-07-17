import _ from 'lodash';

const indent = ' ';
const numberOfIndents = 4;
const shiftLeft = 2;

const getIndentedShift2 = (depth) => indent.repeat(depth * numberOfIndents - shiftLeft);

const getIndentedShift0 = (depth) => indent.repeat(depth * numberOfIndents);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${getIndentedShift0(depth)}${key}: ${stringify(value, depth + 1)}`, '');
  return `{\n${result.join('\n')}\n${getIndentedShift0(depth - 1)}}`;
};

const getStylishFormat = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${getIndentedShift0(depth)}${node.key}: ${getStylishFormat(node.value, depth + 1)}`;
      case 'deleted':
        return `${getIndentedShift2(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'added':
        return `${getIndentedShift2(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed': {
        const del = `${getIndentedShift2(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
        const add = `\n${getIndentedShift2(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        return del + add;
      }
      case 'unchanged':
        return `${getIndentedShift0(depth)}${node.key}: ${stringify(node.value, depth + 1)}`;
      default:
        throw new Error(`Неверный тип узла: ${node.type}`);
    }
  });
  return `{\n${lines.join('\n')}\n${getIndentedShift0(depth - 1)}}`;
};

export default getStylishFormat;
