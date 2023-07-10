import stylish from './stylish.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);

    default:
      throw new Error(`Неверный форматтер: ${format}`);
  }
};

export default formatter;
