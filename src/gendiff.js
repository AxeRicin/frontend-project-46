import _ from 'lodash';
import fileParse from './fileParse.js';

const gendiff = (path1, path2) => {
  const file1 = fileParse(path1);
  const file2 = fileParse(path2);
  const keys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const diff = (keys) => {
    const indent = '  ';
    const result = keys.reduce((acc, key, index) => {
      if (_.has(file1, key) && _.has(file2, key)) {
        if (file1[key] === file2[key]) {
          return `${acc}${indent}  ${key}: ${file1[key]}\n`;
        }
        return `${acc}${indent}- ${key}: ${file1[key]}\n${indent}+ ${key}: ${file2[key]}\n`;
      }
      if (_.has(file1, key)) {
        return `${acc}${indent}- ${key}: ${file1[key]}\n`;
      }
      return `${acc}${indent}+ ${key}: ${file2[key]}\n`;
    }, '');

    return `{\n${result}}`
  };

  return diff(keys);
};

export default gendiff;
