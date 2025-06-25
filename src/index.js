import path from 'path'
import parse from './parsedata.js'
import diff from './diff.js'

const getAbsolutePath = (filepath) => {
  return path.resolve(process.cwd(), filepath)
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPath1 = getAbsolutePath(filepath1)
  const absPath2 = getAbsolutePath(filepath2)

  try {
    const data1 = parse(absPath1)
    const data2 = parse(absPath2)

    const result = diff(data1, data2, formatName)
    return result
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default genDiff
