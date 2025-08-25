import _ from 'lodash'

const formatValue = (value) => {
  if (!_.isObject(value)) {
    return _.isBoolean(value) || _.isNull(value) || _.isNumber(value) ? value : `'${value}'`
  }

  return '[complex value]'
}

const nodeTypes = {
  added: (node, property) => `Property '${property}' was added with value: ${formatValue(node.value)}`,
  removed: (node, property) => `Property '${property}' was removed`,
  changed: (node, property) =>
    `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
  nested: (node, property) => formatPlain(node.children, property),
  unchanged: () => [],
}

const formatPlain = (tree, pathLine = '') => {
  const lines = tree.flatMap((node) => {
    const property = pathLine ? `${pathLine}.${node.key}` : node.key
    const makeLine = nodeTypes[node.type]

    if (!makeLine) {
      throw new Error(`Unknown type: ${node.type}`)
    }

    return makeLine(node, property)
  })

  return lines.join('\n')
}

export default formatPlain
