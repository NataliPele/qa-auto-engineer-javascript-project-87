import fs from 'fs'
import path from 'path'

const parse = (filepath) => {
  // Получаем абсолютный путь
  const absolutePath = path.resolve(process.cwd(), filepath)

  // Читаем файл
  const data = fs.readFileSync(absolutePath, 'utf-8')

  // Определяем формат по расширению
  const ext = path.extname(filepath)

  if (ext === '.json') {
    return JSON.parse(data)
  }

  throw new Error(`Unsupported file format: ${ext}`)
};

export default parse
