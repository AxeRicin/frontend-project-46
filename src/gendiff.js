import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import formatter from './formatters/index.js';
import fileParse from './parsers.js';

const getPath = (filePath) => path.resolve(cwd(), filePath);

const getFileExtension = (filePath) => path.extname(filePath);

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
  const dataFormat1 = getFileExtension(path1).slice(1);
  const dataFormat2 = getFileExtension(path2).slice(1);
  const data1 = fileParse(readFileSync(getPath(path1), 'utf8'), dataFormat1);
  const data2 = fileParse(readFileSync(getPath(path2), 'utf8'), dataFormat2);
  const diff = findDiff(data1, data2);

  return formatter(diff, format);
};

export default genDiff;
