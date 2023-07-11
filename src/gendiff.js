import _ from 'lodash';
import fileParse from './parsers.js';
import formatter from './formatters/index.js';

const findDiff = (data1, data2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));
  const result = keys.reduce((acc, key) => {
    const oldValue = data1[key];
    const newValue = data2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return [...acc, { key, value: findDiff(oldValue, newValue), type: 'nested' }];
    }
    if (!_.has(data2, key)) {
      return [...acc, { key, value: oldValue, type: 'deleted' }];
    }
    if (!_.has(data1, key)) {
      return [...acc, { key, value: newValue, type: 'added' }];
    }
    if (!_.eq(oldValue, newValue)) {
      return [...acc, {
        key, oldValue, newValue, type: 'changed',
      }];
    }
    return [...acc, { key, value: oldValue, type: 'unchanged' }];
  }, []);
  return result;
};

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = fileParse(path1);
  const data2 = fileParse(path2);

  const diff = findDiff(data1, data2);

  /* return JSON.stringify(diff, null, 2); */
  return formatter(diff, format);
};

export default genDiff;
