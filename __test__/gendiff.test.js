import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const parseFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('genDiff', () => {
  test('should work with flat json', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expected = parseFixture('json.txt');
    expect(genDiff(filePath1, filePath2)).toEqual(expected);
  });
});
