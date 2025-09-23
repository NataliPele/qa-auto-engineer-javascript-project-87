import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
};

const plain = (tree) => {
  const iter = (nodes, pathAcc) => nodes
    .flatMap((node) => {
      const { type, key, value, oldValue, newValue, children } = node
      const propPath = pathAcc ? `${pathAcc}.${key}` : key

      switch (type) {
        case 'nested':
          return iter(children, propPath)
        case 'added':
          return `Property '${propPath}' was added with value: ${formatValue(value)}`
        case 'removed':
          return `Property '${propPath}' was removed`
        case 'updated':
          return `Property '${propPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`
        case 'unchanged':
          return []
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })

  return iter(tree, '').join('\n')
};

export default plain
