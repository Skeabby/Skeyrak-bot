const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { ok, err } = require('../../utils/helpers')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('unban').setDescription('Débannit un utilisateur').setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(o => o.setName('id').setDescription("ID de l'utilisateur").setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison')),
  async execute(interaction) {
    try {
      const ban = await interaction.guild.bans.fetch(interaction.options.getString('id'))
      await interaction.guild.members.unban(ban.user.id, interaction.options.getString('raison') || 'Aucune raison')
      await interaction.reply({ embeds: [ok(ban.user.tag + ' a été débanni.')] })
    } catch { await interaction.reply({ embeds: [err('Utilisateur introuvable dans les bans.')], ephemeral: true }) }
  },
}