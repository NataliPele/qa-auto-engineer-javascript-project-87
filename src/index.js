import { readFile, getExt } from './fs.js'
import parse from './parsers.js'
import buildDiff from './diff.js'
import format from './formatters/index.js'

const genDiff = (filepath1, filepath2, fmt = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const obj1 = parse(data1, getExt(filepath1))
  const obj2 = parse(data2, getExt(filepath2))

  const tree = buildDiff(obj1, obj2)
  return format(tree, fmt)
}

export default genDiff
