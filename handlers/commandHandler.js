const { REST, Routes } = require('discord.js')
const { readdirSync }  = require('fs')
const path             = require('path')
const { token, clientId, guildId } = require('../../config')

module.exports = async (client) => {
  const data = []
  const base = path.join(__dirname, '../commands')

  for (const cat of readdirSync(base)) {
    for (const file of readdirSync(`${base}/${cat}`).filter(f => f.endsWith('.js') && !f.startsWith('_'))) {
      try {
        const cmd = require(`${base}/${cat}/${file}`)
        if (!cmd?.data?.name || !cmd?.execute) { console.warn(`[CMD] Ignoré : ${file}`); continue }
        client.commands.set(cmd.data.name, cmd)
        data.push(cmd.data.toJSON())
        console.log(`[CMD] ✅ /${cmd.data.name}`)
      } catch (e) { console.error(`[CMD] ❌ ${file} :`, e.message) }
    }
  }

  const rest  = new REST().setToken(token)
  const route = guildId
    ? Routes.applicationGuildCommands(clientId, guildId)
    : Routes.applicationCommands(clientId)

  await rest.put(route, { body: data })
  console.log(`[CMD] 🚀 ${data.length} commande(s) déployée(s)\n`)
}
