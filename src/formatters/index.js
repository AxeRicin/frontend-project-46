import getPlainFormat from './getPlainFormat.js';
import getStylishFormat from './getStylishFormat.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylishFormat(diff);

    case 'plain':
      return getPlainFormat(diff);

    case 'json':
      return JSON.stringify(diff);

    default:
      throw new Error(`Неверный форматтер: ${format}`);
  }
};

export default formatter;
