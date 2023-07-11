import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const parseFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const fixtureFlatFileNames = [
  ['stylish', 'file1.json', 'file2.json', 'expectedResultStylish.txt'],
  ['stylish', 'file1.yaml', 'file2.yaml', 'expectedResultStylish.txt'],
  ['stylish', 'file1.yml', 'file2.yml', 'expectedResultStylish.txt'],
  ['plain', 'file1.json', 'file2.json', 'expectedResultPlain.txt'],
  ['plain', 'file1.yaml', 'file2.yaml', 'expectedResultPlain.txt'],
];

describe('genDiff', () => {
  test.each(fixtureFlatFileNames)('should work with nested structures %p', (formatter, file1, file2, result) => {
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);
    const expected = parseFixture(result);
    expect(genDiff(filePath1, filePath2, formatter)).toEqual(expected);
  });
  /* test('should throw an error on unknown file format', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file1.darthvader');
    expect(genDiff(filePath1, filePath2)).toThrow(/darthvader/);
  }); */
});
