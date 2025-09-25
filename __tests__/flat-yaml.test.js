import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)
const read = name => fs.readFileSync(getFixturePath(name), 'utf-8')

test('gendiff flat yaml stylish', () => {
  const f1 = getFixturePath('file1.yml')
  const f2 = getFixturePath('file2.yml')
  const expected = read('expected_stylish.txt').trim()

  const result = genDiff(f1, f2, 'stylish').trim()
  expect(result).toBe(expected)
})
