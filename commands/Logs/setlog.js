const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const { ok } = require('../../utils/helpers')
const config = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('setlog').setDescription('Définit le salon de logs')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(o => o.setName('salon').setDescription('Salon').addChannelTypes(ChannelType.GuildText).setRequired(true)),
  async execute(interaction) {
    const ch = interaction.options.getChannel('salon')
    config.channels.logs = ch.id
    await interaction.reply({ embeds: [ok('Logs → ' + ch)] })
  },
}