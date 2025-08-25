import _ from 'lodash'

const setIndent = depth => '    '.repeat(depth)

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`
  }

  const indent = setIndent(depth + 1)
  const bracketIndent = setIndent(depth)

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`)

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (tree, depth = 1) => {
  const indent = setIndent(depth - 1)
  const signIndent = sign => `${indent}  ${sign} `

  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${signIndent('+')}${node.key}: ${formatValue(node.value, depth)}`
      case 'removed':
        return `${signIndent('-')}${node.key}: ${formatValue(node.value, depth)}`
      case 'changed':
        return [
          `${signIndent('-')}${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${signIndent('+')}${node.key}: ${formatValue(node.newValue, depth)}`]
          .join('\n')
      case 'nested':
        return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`
      case 'unchanged':
        return `${signIndent(' ')}${node.key}: ${formatValue(node.value, depth)}`
      default:
        return ''
    }
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

export default formatStylish
