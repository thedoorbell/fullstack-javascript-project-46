import _ from 'lodash'

const buildJson = tree => Object.fromEntries(
  tree.map((node) => {
    switch (node.type) {
      case 'added':
        return [node.key, node.value]
      case 'removed':
        return [node.key, 'DELETED']
      case 'changed':
        return [node.key, { old: node.oldValue, new: node.newValue }]
      case 'nested':
        return [node.key, buildJson(node.children)]
      case 'unchanged':
        return [node.key, node.value]
      default:
        return ''
    }
  }),
)

const formatJson = tree => JSON.stringify(buildJson(tree))

export default formatJson
