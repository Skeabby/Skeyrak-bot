const { readdirSync } = require('fs')
const path            = require('path')

module.exports = async (client) => {
  const base = path.join(__dirname, '../events')
  for (const file of readdirSync(base).filter(f => f.endsWith('.js'))) {
    try {
      const evt = require(`${base}/${file}`)
      if (!evt?.name || !evt?.execute) { console.warn(`[EVT] Ignoré : ${file}`); continue }
      evt.once
        ? client.once(evt.name, (...a) => evt.execute(...a, client))
        : client.on(evt.name,   (...a) => evt.execute(...a, client))
      console.log(`[EVT] ✅ ${evt.name}`)
    } catch (e) { console.error(`[EVT] ❌ ${file} :`, e.message) }
  }
}
