import { useQuery } from '@tanstack/react-query'
import { readFileSync } from 'fs'
import path from 'path'
import { Match } from 'types/match'
import { MATCHES_DIR } from 'utils/constants'
import { readFolder } from 'utils/fs/readFolder'

const getMatches = () => {
  // Get match files list from the app directory
  const files = readFolder(MATCHES_DIR)

  // Return the match json data for each file
  return files.map((matchFile) => {
    const data = readFileSync(path.join(MATCHES_DIR, matchFile), 'utf8')

    return JSON.parse(data) as Match
  })
}

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => getMatches(),
    cacheTime: 10 * 60 * 1000, // 10 minutes
    initialData: []
  })
}
