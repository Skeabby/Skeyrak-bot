const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { err } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('kick').setDescription('Expulse un membre').setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison')),
  async execute(interaction) {
    const t = interaction.options.getMember('membre'), r = interaction.options.getString('raison') || 'Aucune raison'
    if (!t?.kickable) return interaction.reply({ embeds: [err('Impossible de kick.')], ephemeral: true })
    try { await t.send({ embeds: [new EmbedBuilder().setColor(colors.warn).setTitle('Expulsé de ' + interaction.guild.name).addFields({ name: 'Raison', value: r })] }) } catch {}
    await t.kick(r)
    await interaction.reply({ embeds: [new EmbedBuilder().setColor(colors.warn).setTitle(emojis.success + ' Membre expulsé').addFields({ name: 'Membre', value: t.user.tag, inline: true }, { name: 'Modérateur', value: interaction.user.tag, inline: true }, { name: 'Raison', value: r }).setTimestamp()] })
  },
}