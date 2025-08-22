import _ from 'lodash'

const formatValue = (value) => {
  if (!_.isObject(value)) {
    return _.isBoolean(value) || _.isNull(value) ? value : `'${value}'`
  }

  return '[complex value]'
}

const formatPlain = (tree, pathLine = '') => {
  const lines = tree.flatMap((node) => {
    const property = pathLine ? `${pathLine}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${property}' was removed`
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return formatPlain(node.children, property)
      case 'unchanged':
        return []
      default:
        return ''
    }
  })

  return lines.join('\n')
}

export default formatPlain
