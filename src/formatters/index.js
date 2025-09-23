import stylish from './stylish.js'
import plain from './plain.js'

const format = (tree, type = 'stylish') => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Unknown format: &{type)`)
  }
}

export default format
