import path from 'node:path';
import { cwd } from 'node:process';

const getPath = (filePath) => {
  if (filePath.includes(cwd())) {
    return filePath;
  }
  if (!filePath.startsWith('.')) {
    return path.resolve(cwd(), `.${path.normalize(filePath)}`);
  }
  return path.resolve(cwd(), filePath);
};

export default getPath;
