const { SlashCommandBuilder } = require('discord.js')
const { ok, err, parseDur, mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('remind').setDescription('Crée un rappel')
    .addStringOption(o => o.setName('duree').setDescription('Durée (10m, 2h, 1d)').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('Rappel').setRequired(true)),
  async execute(interaction) {
    const ms = parseDur(interaction.options.getString('duree')), msg = interaction.options.getString('message')
    if (!ms || ms > 7 * 864e5) return interaction.reply({ embeds: [err('Durée invalide (max 7j). Ex: 10m, 2h, 1d')], ephemeral: true })
    await interaction.reply({ embeds: [ok('Rappel dans <t:' + Math.floor((Date.now() + ms) / 1000) + ':R> !')] })
    setTimeout(async () => {
      try { await interaction.user.send({ embeds: [mkEmbed(msg, colors.primary).setTitle('⏰ Rappel !').setTimestamp()] }) }
      catch { interaction.channel?.send({ content: String(interaction.user), embeds: [mkEmbed(msg, colors.primary).setTitle('⏰ Rappel !').setTimestamp()] }).catch(() => {}) }
    }, ms)
  },
}