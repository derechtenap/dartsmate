import { unlinkSync } from 'fs'

export const deleteFile = (path: string) => {
  unlinkSync(path)
}
