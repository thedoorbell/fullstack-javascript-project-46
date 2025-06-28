import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('Compare flat JSONs', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expectedPath = getFixturePath('expected1.txt')
  const expected = fs.readFileSync(expectedPath, 'utf-8')

  expect(genDiff(file1, file2)).toBe(expected)
})

test('Compare flat YAMLs', () => {
  const file1 = getFixturePath('file1.yaml')
  const file2 = getFixturePath('file2.yml')
  const expectedPath = getFixturePath('expected1.txt')
  const expected = fs.readFileSync(expectedPath, 'utf-8')

  expect(genDiff(file1, file2)).toBe(expected)
})
