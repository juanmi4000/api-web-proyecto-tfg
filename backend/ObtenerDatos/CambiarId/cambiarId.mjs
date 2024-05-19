import fs from 'node:fs'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const animes = require('../../animes.json')

animes.forEach((anime) => {
  anime.id = crypto.randomUUID()
})

fs.writeFileSync('./backend/animes-1.json', JSON.stringify(animes, null, 2))

console.log(animes[0].id)
