import fs from 'fs'
import path from 'path'

export const readFile = (filepath) => {
  const absolute = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolute, 'utf-8')
};

export const getExt = filepath => path.extname(filepath).toLowerCase()
