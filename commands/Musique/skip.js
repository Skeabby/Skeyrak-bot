const { SlashCommandBuilder } = require('discord.js')
const { ok, err } = require('../../utils/helpers')
module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder().setName('skip').setDescription('Passe la musique'),
  async execute(interaction, client) {
    const q = client.queue.get(interaction.guild.id)
    if (!q) return interaction.reply({ embeds: [err('Aucune musique en cours.')], ephemeral: true })
    q.skip(); await interaction.reply({ embeds: [ok('Musique passée !')] })
  },
}