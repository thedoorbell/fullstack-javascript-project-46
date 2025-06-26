import _ from 'lodash'

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2)
  const sortedKeys = _.sortBy(keys)

  const result = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      return `${acc}  + ${key}: ${data2[key]}\n`
    }
    else if (!Object.hasOwn(data2, key)) {
      return `${acc}  - ${key}: ${data1[key]}\n`
    }
    else if (data1[key] !== data2[key]) {
      acc += `  - ${key}: ${data1[key]}\n`
      acc += `  + ${key}: ${data2[key]}\n`
      return acc
    }
    else {
      return `${acc}    ${key}: ${data1[key]}\n`
    }
  }, '')

  return `{\n${result}}`
}

export default diff
