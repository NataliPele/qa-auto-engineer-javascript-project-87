import _ from 'lodash'
import parse from './parser.js'

const toString = (value) => (
  typeof value === 'string' ? value : JSON.stringify(value)
);

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  const lines = keys.flatMap((key) => {
    const in1 = Object.hasOwn(obj1, key)
    const in2 = Object.hasOwn(obj2, key)

    if (in1 && in2) {
      if (_.isEqual(obj1[key], obj2[key])) {
        return [`    ${key}: ${toString(obj1[key])}`];
      }
      return [
        `  - ${key}: ${toString(obj1[key])}`,
        `  + ${key}: ${toString(obj2[key])}`,
      ]
    }

    if (in1) return [`  - ${key}: ${toString(obj1[key])}`]
    return [`  + ${key}: ${toString(obj2[key])}`]
  })

  return `{\n${lines.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)
  return buildDiff(obj1, obj2)
}

export default genDiff;
