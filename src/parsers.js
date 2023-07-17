import yaml from 'js-yaml';

const fileParse = (data, dataFormat) => {
  switch (dataFormat.toLowerCase()) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Неверное расширение файла: ${dataFormat}`);
  }
};

export default fileParse;
