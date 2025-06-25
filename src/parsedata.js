import * as fs from 'fs'
import yaml from 'js-yaml'

const parse = (path) => {
  const data = fs.readFileSync(path)

  if (path.endsWith('.json')) {
    return JSON.parse(data)
  }
  if (path.endsWith('.yml') || path.endsWith('.yaml')) {
    return yaml.load(data)
  }

  throw new Error(`Unsupported file format - ${path.split('.')[1]}`)
}

export default parse
