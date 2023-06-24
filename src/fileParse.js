import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const getPath = (filePath) => path.resolve(cwd(), filePath);

const getFileExtension = (filePath) => path.extname(filePath);

const fileParse = (filePath) => {
  const data = readFileSync(getPath(filePath), 'utf8');
  const fileExtension = getFileExtension(filePath).slice(1);
  switch (fileExtension.toLowerCase()) {
    case 'json':
      return JSON.parse(data);

    default:
      throw new Error(`Неверное расширение файла: ${fileExtension}`);
  }
};

export default fileParse;
