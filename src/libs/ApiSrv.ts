import { ApiType } from 'farrow-api'
import { ApiService } from 'farrow-api-server'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export function ApiDirMap(path: string) {
  const entries = {}
  try {
    const dirs = readdirSync(path)
    for (const fileName of dirs) {
      if (['index.ts'].includes(fileName) || fileName[0] === '_') {
        continue
      }
      const key = fileName.split('.ts')[0]
      import(resolve(path, fileName)).then(console.log)
      // entries[key] = entry
      // console.log(entry)
    }
  } catch (error) {
    throw error;

  }

  return ApiService({
    entries
  })
}