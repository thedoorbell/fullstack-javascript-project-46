import * as fs from 'fs'
import yaml from 'js-yaml'
import { extname } from 'path'

const parse = (path) => {
  const data = fs.readFileSync(path)
  const ext = extname(path)

  if (ext === '.json') {
    return JSON.parse(data)
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data)
  }

  throw new Error(`Unsupported file format - ${ext}`)
}

export default parse
