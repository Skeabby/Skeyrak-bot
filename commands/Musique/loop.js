const { SlashCommandBuilder } = require('discord.js')
const { err, mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder().setName('loop').setDescription('Active/désactive la répétition'),
  async execute(interaction, client) {
    const q = client.queue.get(interaction.guild.id)
    if (!q) return interaction.reply({ embeds: [err('Aucune musique.')], ephemeral: true })
    q.loop = !q.loop
    await interaction.reply({ embeds: [mkEmbed('🔁 Répétition : **' + (q.loop ? 'Activée' : 'Désactivée') + '**', colors.primary)] })
  },
}