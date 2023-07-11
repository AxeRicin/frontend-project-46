# Tests and linter status:
[![Actions Status](https://github.com/AxeRicin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AxeRicin/frontend-project-46/actions)
[![custom-tests](https://github.com/AxeRicin/frontend-project-46/actions/workflows/custom-tests.yml/badge.svg)](https://github.com/AxeRicin/frontend-project-46/actions/workflows/custom-tests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/9c33dfdc8f8fb48dd180/maintainability)](https://codeclimate.com/github/AxeRicin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9c33dfdc8f8fb48dd180/test_coverage)](https://codeclimate.com/github/AxeRicin/frontend-project-46/test_coverage)

# Description:
A difference calculator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as [JSON DIFF](http://www.jsondiff.com/). A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

### Utility features:

* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

## Usage example:

### Plain format:
```
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
```
### Stylish format:

```
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

## Installation:

* Make sure you have installed Node.js version 12 and above.
* Clone or download this repository.
* While in the local directory of the project, use the command `make install` or `make link`.

## Demonstration of work

### Working with `gendiff()` with a standard formatter and calling a helper:
[![asciicast](https://asciinema.org/a/RepLszwMwqtzHyFjltIvrGKjF.svg)](https://asciinema.org/a/RepLszwMwqtzHyFjltIvrGKjF)

### How `gendiff()` works with Stylish format:
[![asciicast](https://asciinema.org/a/eLMXGcTWHCLeiVruA2SWaBtPf.svg)](https://asciinema.org/a/eLMXGcTWHCLeiVruA2SWaBtPf)

### How `gendiff()` works with Plain format:
[![asciicast](https://asciinema.org/a/MXNUtihVEgTCPL0CSZAneHqYs.svg)](https://asciinema.org/a/MXNUtihVEgTCPL0CSZAneHqYs)

### How `gendiff()` works with JSON format:
[![asciicast](https://asciinema.org/a/yq9axzaSK3EDiMR85QbIL31KD.svg)](https://asciinema.org/a/yq9axzaSK3EDiMR85QbIL31KD)