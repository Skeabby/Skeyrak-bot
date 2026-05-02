const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { triggerLockdown } = require('../../structures/anti-raid/antiRaid')
const { ok, err, mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('antiraid').setDescription('Gère le système anti-raid')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(s => s.setName('on').setDescription('Active le lockdown'))
    .addSubcommand(s => s.setName('off').setDescription('Désactive le lockdown'))
    .addSubcommand(s => s.setName('status').setDescription('Statut anti-raid')),
  async execute(interaction, client) {
    const sub  = interaction.options.getSubcommand()
    const data = client.antiraid.get(interaction.guild.id) || { locked: false, joins: [] }
    if (sub === 'status') return interaction.reply({ embeds: [mkEmbed('', data.locked ? 0xED4245 : 0x57F287).setTitle('🛡️ Anti-Raid').addFields({ name: 'Lockdown', value: data.locked ? '🔴 Actif' : '🟢 Inactif', inline: true }, { name: 'Joins récents', value: String(data.joins.length), inline: true })] })
    if (sub === 'on')  { await triggerLockdown(interaction.guild, client); return interaction.reply({ embeds: [err('🚨 Lockdown activé.')] }) }
    if (sub === 'off') {
      for (const [, ch] of interaction.guild.channels.cache) { if (ch.isTextBased()) ch.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null }).catch(() => {}) }
      data.locked = false; data.joins = []
      return interaction.reply({ embeds: [ok('Lockdown désactivé.')] })
    }
  },
}