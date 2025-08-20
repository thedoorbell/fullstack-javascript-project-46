import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('Compare everything!', () => {
  const json1 = getFixturePath('file1.json')
  const json2 = getFixturePath('file2.json')
  const yaml1 = getFixturePath('file1.yaml')
  const yaml2 = getFixturePath('file2.yml')

  const expectedStylish = readFile('expected1.txt')
  const expectedPlain = readFile('expected2.txt')

  expect(genDiff(json1, json2)).toBe(expectedStylish)
  expect(genDiff(yaml1, yaml2)).toBe(expectedStylish)
  expect(genDiff(json1, json2, 'plain')).toBe(expectedPlain)
})
