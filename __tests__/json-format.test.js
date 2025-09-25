import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)
const read = name => fs.readFileSync(getFixturePath(name), 'utf-8')

test('gendiff json formatter on flat JSON', () => {
  const f1 = getFixturePath('file1.json')
  const f2 = getFixturePath('file2.json')

  const expectedObj = JSON.parse(read('expected_json.json'))
  const resultObj = JSON.parse(genDiff(f1, f2, 'json'))

  expect(resultObj).toEqual(expectedObj)
})

test('gendiff json formatter on flat YAML', () => {
  const f1 = getFixturePath('file1.yml')
  const f2 = getFixturePath('file2.yml')

  const expectedObj = JSON.parse(read('expected_json.json'))
  const resultObj = JSON.parse(genDiff(f1, f2, 'json'))

  expect(resultObj).toEqual(expectedObj)
})
