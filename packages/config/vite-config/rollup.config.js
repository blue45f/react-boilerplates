import path from 'path'
import { fileURLToPath } from 'url'

import { boilerplateRollupConfig } from '@boilerplate/rollup-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default boilerplateRollupConfig({
  baseUrl: __dirname,
})
