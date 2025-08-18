import path from 'path'
import parse from './parsers.js'
import diff from './diff.js'
import format from './formatter.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPath1 = getAbsolutePath(filepath1)
  const absPath2 = getAbsolutePath(filepath2)

  try {
    const data1 = parse(absPath1)
    const data2 = parse(absPath2)
    const diffTree = diff(data1, data2)
    const result = format(diffTree, formatName)

    return result
  }
  catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default genDiff
