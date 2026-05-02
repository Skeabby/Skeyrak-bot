const { SlashCommandBuilder } = require('discord.js')
const { isOwner, mkEmbed } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('servers').setDescription('[Owner] Liste les serveurs'),
  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) return interaction.reply({ content: emojis.error + ' Owner only.', ephemeral: true })
    const list = client.guilds.cache.map(g => g.id + ' **' + g.name + '** — ' + g.memberCount + ' membres').slice(0, 20).join('
')
    await interaction.reply({ embeds: [mkEmbed(list, colors.primary).setTitle('🌐 Serveurs (' + client.guilds.cache.size + ')')], ephemeral: true })
  },
}