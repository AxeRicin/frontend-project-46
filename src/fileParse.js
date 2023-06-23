import { readFileSync } from 'node:fs';
import getPath from './getPath.js';

const fileParse = (filePath) => {
  const file = readFileSync(getPath(filePath), { encoding: 'utf8', flag: 'r' });
  if (filePath.endsWith('.json')) {
    return JSON.parse(file);
  }
  return file;
};

export default fileParse;
