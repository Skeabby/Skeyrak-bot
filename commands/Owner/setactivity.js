const { SlashCommandBuilder, ActivityType } = require('discord.js')
const { isOwner, ok } = require('../../utils/helpers')
const { emojis } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('setactivity').setDescription("[Owner] Change l'activité")
    .addStringOption(o => o.setName('texte').setDescription('Texte').setRequired(true))
    .addStringOption(o => o.setName('type').setDescription('Type').addChoices({ name: 'Joue', value: 'Playing' }, { name: 'Regarde', value: 'Watching' }, { name: 'Écoute', value: 'Listening' })),
  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) return interaction.reply({ content: emojis.error + ' Owner only.', ephemeral: true })
    const t = interaction.options.getString('texte'), type = interaction.options.getString('type') || 'Playing'
    client.user.setActivity(t, { type: ActivityType[type] })
    await interaction.reply({ embeds: [ok('Activité → ' + type + ' ' + t)], ephemeral: true })
  },
}