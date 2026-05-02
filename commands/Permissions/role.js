const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { ok } = require('../../utils/helpers')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('role').setDescription('Gère un rôle').setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand(s => s.setName('add').setDescription('Ajouter').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true)).addRoleOption(o => o.setName('role').setDescription('Rôle').setRequired(true)))
    .addSubcommand(s => s.setName('remove').setDescription('Retirer').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true)).addRoleOption(o => o.setName('role').setDescription('Rôle').setRequired(true))),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand(), m = interaction.options.getMember('membre'), r = interaction.options.getRole('role')
    if (sub === 'add')    { await m.roles.add(r);    return interaction.reply({ embeds: [ok('Rôle **' + r.name + '** ajouté à ' + m + '.')] }) }
    if (sub === 'remove') { await m.roles.remove(r); return interaction.reply({ embeds: [ok('Rôle **' + r.name + '** retiré de ' + m + '.')] }) }
  },
}