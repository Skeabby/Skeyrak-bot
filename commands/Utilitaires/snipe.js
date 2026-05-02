const { SlashCommandBuilder } = require('discord.js')
const { warn, mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('snipe').setDescription('Dernier message supprimé'),
  async execute(interaction, client) {
    const s = client.snipes.get(interaction.channel.id)
    if (!s) return interaction.reply({ embeds: [warn('Aucun message supprimé récemment.')], ephemeral: true })
    const embed = mkEmbed(s.content, colors.info).setAuthor({ name: s.author.tag, iconURL: s.author.displayAvatarURL() }).setTimestamp(s.at)
    if (s.image) embed.setImage(s.image)
    await interaction.reply({ embeds: [embed] })
  },
}