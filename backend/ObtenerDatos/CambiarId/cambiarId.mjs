import fs from 'node:fs'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const animes = require('../json-copia/animes.json')

animes.forEach((anime) => {
  anime.id = crypto.randomUUID()
})

fs.writeFileSync('./backend/animes.json', JSON.stringify(animes, null, 2))
