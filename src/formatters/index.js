import stylish from './stylish.js'

const format = (tree, type = 'stylish') => {
  if (type === 'stylish') return stylish(tree)
  throw new Error(`Unknown format: ${type}`)
}

export default format
