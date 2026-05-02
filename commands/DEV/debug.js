const { SlashCommandBuilder, codeBlock } = require('discord.js')
const { isOwner, mkEmbed } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('debug').setDescription('[DEV] Infos de debug'),
  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) return interaction.reply({ content: emojis.error + ' Réservé au dev.', ephemeral: true })
    const m = process.memoryUsage()
    await interaction.reply({ embeds: [mkEmbed('', colors.primary).setTitle('🔧 Debug').setDescription(codeBlock('json', JSON.stringify({ uptime: process.uptime().toFixed(0) + 's', ram: (m.heapUsed / 1024 / 1024).toFixed(1) + 'MB', guilds: client.guilds.cache.size, cmds: client.commands.size, queue: client.queue.size, tickets: client.tickets.size, giveaways: client.giveaways.size }, null, 2)))], ephemeral: true })
  },
}