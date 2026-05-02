const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { err, mkEmbed } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('mute').setDescription('Timeout un membre').setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
    .addStringOption(o => o.setName('duree').setDescription('Durée').setRequired(true).addChoices({ name: '1min', value: '60' }, { name: '5min', value: '300' }, { name: '30min', value: '1800' }, { name: '1h', value: '3600' }, { name: '1j', value: '86400' }, { name: '1sem', value: '604800' }))
    .addStringOption(o => o.setName('raison').setDescription('Raison')),
  async execute(interaction) {
    const t = interaction.options.getMember('membre'), d = parseInt(interaction.options.getString('duree')), r = interaction.options.getString('raison') || 'Aucune raison'
    if (!t?.moderatable) return interaction.reply({ embeds: [err('Impossible de muter.')], ephemeral: true })
    await t.timeout(d * 1000, r)
    await interaction.reply({ embeds: [mkEmbed('', colors.warn).setTitle(emojis.success + ' Muté').addFields({ name: 'Membre', value: t.user.tag, inline: true }, { name: 'Durée', value: d + 's', inline: true }, { name: 'Raison', value: r }).setTimestamp()] })
  },
}