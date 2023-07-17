import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlainFormat = (data, path = []) => {
  const result = data.map((node) => {
    const newPath = [...path, node.key];
    switch (node.type) {
      case 'unchanged':
        return '';
      case 'nested':
        return getPlainFormat(node.value, newPath);
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${getValue(node.value)}`;
      case 'deleted':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${newPath.join('.')}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
      default:
        throw new Error(`Неверный тип узла: ${node.type}`);
    }
  });

  return result.filter((str) => str !== '').join('\n');
};

export default getPlainFormat;
