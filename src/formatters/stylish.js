import _ from 'lodash'

const INDENT_SIZE = 4
const indent = depth => ' '.repeat(depth * INDENT_SIZE - 2)
const braceIndent = depth => ' '.repeat(depth * INDENT_SIZE)

const stringify = (val, depth) => {
  if (!_.isPlainObject(val)) return String(val)
  const lines = Object
    .entries(val)
    .map(([k, v]) => `${braceIndent(depth + 1)}${k}: ${stringify(v, depth + 1)}`)
  return `{\n${lines.join('\n')}\n${braceIndent(depth)}}`
}

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      const { type, key, value, oldValue, newValue, children } = node

      switch (type) {
        case 'nested':
          return `${braceIndent(depth)}${key}: ${iter(children, depth + 1)}`
        case 'unchanged':
          return `${indent(depth)}  ${key}: ${stringify(value, depth)}`
        case 'removed':
          return `${indent(depth)}- ${key}: ${stringify(value, depth)}`
        case 'added':
          return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`
        case 'updated':
          return [
            `${indent(depth)}- ${key}: ${stringify(oldValue, depth)}`,
            `${indent(depth)}+ ${key}: ${stringify(newValue, depth)}`,
          ]
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })
    return `{\n${lines.join('\n')}\n${braceIndent(depth - 1)}}`
  }

  return iter(tree, 1)
}

export default stylish
