import path from 'path'
import fs from 'fs'
import parse from './parsers.js'
import diff from './diff.js'
import format from './formatters/index.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPath1 = getAbsolutePath(filepath1)
  const absPath2 = getAbsolutePath(filepath2)
  const rawData1 = fs.readFileSync(absPath1)
  const rawData2 = fs.readFileSync(absPath2)
  const ext1 = path.extname(absPath1)
  const ext2 = path.extname(absPath2)

  try {
    const data1 = parse(rawData1, ext1)
    const data2 = parse(rawData2, ext2)
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
