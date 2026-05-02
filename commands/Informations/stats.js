const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
const os = require('os')
module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder().setName('stats').setDescription('Statistiques du bot'),
  async execute(interaction, client) {
    const u = process.uptime(), d = Math.floor(u / 86400), h = Math.floor((u % 86400) / 3600), m = Math.floor((u % 3600) / 60), s = Math.floor(u % 60)
    const mem = process.memoryUsage()
    await interaction.reply({ embeds: [mkEmbed('', colors.primary).setTitle(emojis.stats + ' Statistiques').setThumbnail(client.user.displayAvatarURL()).addFields({ name: '⏱️ Uptime', value: d + 'j ' + h + 'h ' + m + 'm ' + s + 's', inline: true }, { name: '🏓 Ping', value: client.ws.ping + 'ms', inline: true }, { name: '💾 RAM', value: (mem.heapUsed / 1024 / 1024).toFixed(1) + 'MB', inline: true }, { name: '🌐 Serveurs', value: String(client.guilds.cache.size), inline: true }, { name: '👥 Membres', value: String(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)), inline: true }, { name: '⚙️ Node', value: process.version, inline: true }).setTimestamp().setFooter({ text: client.user.id })] })
  },
}