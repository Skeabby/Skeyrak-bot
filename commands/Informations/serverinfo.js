const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder().setName('serverinfo').setDescription('Infos du serveur'),
  async execute(interaction) {
    const g = interaction.guild
    await interaction.reply({ embeds: [mkEmbed('', colors.primary).setAuthor({ name: g.name, iconURL: g.iconURL() }).setThumbnail(g.iconURL({ size: 256 })).addFields({ name: 'ID', value: g.id, inline: true }, { name: 'Owner', value: '<@' + g.ownerId + '>', inline: true }, { name: 'Membres', value: String(g.memberCount), inline: true }, { name: 'Salons', value: String(g.channels.cache.size), inline: true }, { name: 'Rôles', value: String(g.roles.cache.size), inline: true }, { name: 'Boosts', value: String(g.premiumSubscriptionCount || 0), inline: true }).setTimestamp()] })
  },
}