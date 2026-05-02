const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('addbuyer').setDescription('Ajoute un acheteur')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(o => o.setName('membre').setDescription("L'acheteur").setRequired(true))
    .addRoleOption(o => o.setName('role').setDescription('Rôle').setRequired(true))
    .addStringOption(o => o.setName('produit').setDescription('Produit').setRequired(false)),
  async execute(interaction) {
    const m = interaction.options.getMember('membre'), r = interaction.options.getRole('role'), p = interaction.options.getString('produit') || 'Non spécifié'
    await m.roles.add(r)
    await interaction.reply({ embeds: [mkEmbed('', colors.success).setTitle('✅ Acheteur ajouté').addFields({ name: 'Membre', value: m.user.tag, inline: true }, { name: 'Rôle', value: r.name, inline: true }, { name: 'Produit', value: p, inline: true }).setTimestamp()] })
  },
}