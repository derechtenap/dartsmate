import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in the BrowserWindow!')
}

try {
  contextBridge.exposeInMainWorld('context', {})
} catch (error) {
  console.error(error)
}
