import yaml from 'js-yaml'

const parse = (data, ext) => {
  if (ext === '.json') {
    return JSON.parse(data)
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data)
  }

  throw new Error(`Unsupported file format: ${ext}`)
}

export default parse
