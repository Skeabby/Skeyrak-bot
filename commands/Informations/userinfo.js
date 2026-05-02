const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('userinfo').setDescription("Infos d'un membre").addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(false)),
  async execute(interaction) {
    const m = interaction.options.getMember('membre') || interaction.member, u = m.user
    const roles = m.roles.cache.filter(r => r.id !== interaction.guild.id).sort((a, b) => b.position - a.position).map(r => r.toString()).slice(0, 10)
    await interaction.reply({ embeds: [mkEmbed('', m.displayHexColor || colors.primary).setAuthor({ name: u.tag, iconURL: u.displayAvatarURL() }).setThumbnail(u.displayAvatarURL({ size: 256 })).addFields({ name: 'ID', value: u.id, inline: true }, { name: 'Bot', value: u.bot ? 'Oui' : 'Non', inline: true }, { name: 'Créé', value: '<t:' + Math.floor(u.createdTimestamp / 1000) + ':R>', inline: true }, { name: 'Rejoint', value: '<t:' + Math.floor(m.joinedTimestamp / 1000) + ':R>', inline: true }, { name: 'Rôles (' + roles.length + ')', value: roles.join(', ') || 'Aucun' }).setTimestamp()] })
  },
}