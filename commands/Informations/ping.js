const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('ping').setDescription('Latence du bot'),
  async execute(interaction, client) {
    const sent = await interaction.reply({ content: '⏳', fetchReply: true })
    await interaction.editReply({ content: null, embeds: [mkEmbed('', colors.primary).setTitle('🏓 Pong !').addFields({ name: 'Bot', value: sent.createdTimestamp - interaction.createdTimestamp + 'ms', inline: true }, { name: 'WS', value: client.ws.ping + 'ms', inline: true })] })
  },
}