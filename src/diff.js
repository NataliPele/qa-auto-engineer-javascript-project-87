import _ from 'lodash'

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return keys.map((key) => {
    const has1 = Object.hasOwn(obj1, key)
    const has2 = Object.hasOwn(obj2, key)

    if (has1 && has2) {
      const v1 = obj1[key]
      const v2 = obj2[key]

      if (_.isPlainObject(v1) && _.isPlainObject(v2)) {
        return { type: 'nested', key, children: buildDiff(v1, v2) }
      }
      if (_.isEqual(v1, v2)) return { type: 'unchanged', key, value: v1 }
      return { type: 'updated', key, oldValue: v1, newValue: v2 }
    }

    if (has1) return { type: 'removed', key, value: obj1[key] }
    return { type: 'added', key, value: obj2[key] }
  })
}

export default buildDiff
