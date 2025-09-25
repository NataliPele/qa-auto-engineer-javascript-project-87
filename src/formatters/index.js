import stylish from './stylish.js'
import plain from './plain.js'
import jsonFormatter from './json.js'

const format = (tree, type = 'stylish') => {
  switch (type) {
    case 'stylish':
      return stylish(tree)
    case 'plain':
      return plain(tree)
    case 'json':
      return jsonFormatter(tree)
    default:
      throw new Error(`Unknown format: &{type)`)
  }
}

export default format
