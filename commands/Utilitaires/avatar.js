const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('avatar').setDescription("Avatar d'un membre").addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(false)),
  async execute(interaction) {
    const u = interaction.options.getUser('membre') || interaction.user
    const links = ['png', 'jpg', 'webp'].map(f => '[' + f.toUpperCase() + '](' + u.displayAvatarURL({ extension: f, size: 4096 }) + ')').join(' • ')
    await interaction.reply({ embeds: [mkEmbed(links, colors.primary).setTitle('Avatar de ' + u.username).setImage(u.displayAvatarURL({ size: 4096 }))] })
  },
}