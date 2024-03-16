import { writeFileSync } from 'fs'

export const createFile = (path: string, data: string) => {
  writeFileSync(path, data)
}
