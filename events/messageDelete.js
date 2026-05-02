// messageDelete.js
const { Events } = require('discord.js')
module.exports = {
  name: Events.MessageDelete,
  execute(msg, client) {
    if (msg.author?.bot) return
    client.snipes.set(msg.channel.id, { content: msg.content || '*[sans texte]*', author: msg.author, at: msg.createdAt, image: msg.attachments.first()?.url || null })
  },
}
