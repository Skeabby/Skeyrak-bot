const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { err } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('ban').setDescription('Bannit un membre').setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison'))
    .addIntegerOption(o => o.setName('messages').setDescription('Suppr. msgs (jours 0-7)').setMinValue(0).setMaxValue(7)),
  async execute(interaction) {
    const t = interaction.options.getMember('membre'), r = interaction.options.getString('raison') || 'Aucune raison', d = interaction.options.getInteger('messages') || 0
    if (!t?.bannable) return interaction.reply({ embeds: [err('Impossible de bannir ce membre.')], ephemeral: true })
    try { await t.send({ embeds: [new EmbedBuilder().setColor(colors.error).setTitle('Banni de ' + interaction.guild.name).addFields({ name: 'Raison', value: r })] }) } catch {}
    await t.ban({ reason: r, deleteMessageSeconds: d * 86400 })
    await interaction.reply({ embeds: [new EmbedBuilder().setColor(colors.error).setTitle(emojis.success + ' Membre banni').addFields({ name: 'Membre', value: t.user.tag, inline: true }, { name: 'Modérateur', value: interaction.user.tag, inline: true }, { name: 'Raison', value: r }).setTimestamp()] })
  },
}