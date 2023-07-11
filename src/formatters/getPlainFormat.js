import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlainFormat = (data, path = []) => {
  const result = data.reduce((acc, node) => {
    const newPath = [...path, node.key];
    switch (node.type) {
      case 'nested':
        return [...acc, getPlainFormat(node.value, newPath)];
      case 'added':
        return [...acc, `Property '${newPath.join('.')}' was added with value: ${getValue(node.value)}`];
      case 'deleted':
        return [...acc, `Property '${newPath.join('.')}' was removed`];
      case 'changed':
        return [...acc, `Property '${newPath.join('.')}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`];

      case 'unchanged':
        return acc;

      default:
        throw new Error(`Неверный тип узла: ${node.type}`);
    }
  }, []);

  return result.join('\n');
};

export default getPlainFormat;
