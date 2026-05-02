const { SlashCommandBuilder } = require('discord.js')
const { ok, err } = require('../../utils/helpers')
module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder().setName('pause').setDescription('Met en pause'),
  async execute(interaction, client) {
    const q = client.queue.get(interaction.guild.id)
    if (!q) return interaction.reply({ embeds: [err('Aucune musique en cours.')], ephemeral: true })
    q.pause(); await interaction.reply({ embeds: [ok('⏸️ En pause.')] })
  },
}