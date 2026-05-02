const { SlashCommandBuilder } = require('discord.js')
const { ok, err, mkEmbed } = require('../../utils/helpers')
const { colors, channels } = require('../../../config')
module.exports = {
  cooldown: 60,
  data: new SlashCommandBuilder().setName('contact').setDescription('Envoie un message au staff')
    .addStringOption(o => o.setName('message').setDescription('Votre message').setRequired(true)),
  async execute(interaction, client) {
    const logCh = client.channels.cache.get(channels.logs)
    if (!logCh) return interaction.reply({ embeds: [err('Aucun salon de logs configuré.')], ephemeral: true })
    await logCh.send({ embeds: [mkEmbed(interaction.options.getString('message'), colors.info).setTitle('📬 Contact').setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()] })
    await interaction.reply({ embeds: [ok('Message transmis.')], ephemeral: true })
  },
}