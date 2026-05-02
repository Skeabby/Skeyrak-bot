const { Events, ActivityType } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const members = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    console.log(`✅  ${client.user.tag}  |  ${client.guilds.cache.size} serveurs  |  ${members} membres\n`)
    client.user.setPresence({ activities: [{ name: '/help', type: ActivityType.Listening }], status: 'online' })
  },
}
