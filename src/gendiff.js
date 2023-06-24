import _ from 'lodash';
import fileParse from './fileParse.js';

const genDiff = (path1, path2) => {
  const data1 = fileParse(path1);
  const data2 = fileParse(path2);
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

  const diff = () => {
    const indent = '  ';
    const result = keys.reduce((acc, key) => {
      if (_.has(data1, key) && _.has(data2, key)) {
        if (data1[key] === data2[key]) {
          return `${acc}${indent}  ${key}: ${data1[key]}\n`;
        }
        return `${acc}${indent}- ${key}: ${data1[key]}\n${indent}+ ${key}: ${data2[key]}\n`;
      }
      if (_.has(data1, key)) {
        return `${acc}${indent}- ${key}: ${data1[key]}\n`;
      }
      return `${acc}${indent}+ ${key}: ${data2[key]}\n`;
    }, '');

    return `{\n${result}}`;
  };

  return diff(keys);
};

export default genDiff;
