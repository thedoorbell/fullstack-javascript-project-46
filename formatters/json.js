import _ from 'lodash'

const formatValue = (value) => {
  if (!_.isObject(value)) {
    return _.isBoolean(value) || _.isNull(value) ? value : `${value}`
  }

  return value
}

const buildJson = tree => Object.fromEntries(
  tree.map((node) => {
    switch (node.type) {
      case 'added':
        return [node.key, formatValue(node.value)]
      case 'removed':
        return [node.key, 'DELETED']
      case 'changed':
        return [node.key, { old: formatValue(node.oldValue), new: formatValue(node.newValue) }]
      case 'nested':
        return [node.key, buildJson(node.children)]
      case 'unchanged':
        return [node.key, formatValue(node.value)]
      default:
        return ''
    }
  }),
)

const formatJson = tree => JSON.stringify(buildJson(tree))

export default formatJson
