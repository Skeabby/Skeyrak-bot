const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('invite').setDescription("Stats d'invitation").addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(false)),
  async execute(interaction) {
    const t = interaction.options.getMember('membre') || interaction.member
    const invites = await interaction.guild.invites.fetch()
    const mine    = invites.filter(i => i.inviter?.id === t.id)
    await interaction.reply({ embeds: [mkEmbed('', colors.primary).setAuthor({ name: t.user.tag, iconURL: t.user.displayAvatarURL() }).setTitle('📨 Invitations').addFields({ name: 'Liens', value: String(mine.size), inline: true }, { name: 'Total joins', value: String(mine.reduce((a, i) => a + i.uses, 0)), inline: true })] })
  },
}