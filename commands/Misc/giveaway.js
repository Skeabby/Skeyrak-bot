const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const gw = require('../../structures/giveaways/giveawayHandler')
const { ok, err } = require('../../utils/helpers')
module.exports = {
  data: new SlashCommandBuilder().setName('giveaway').setDescription('Gère les giveaways')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand(s => s.setName('start').setDescription('Lance un giveaway')
      .addStringOption(o => o.setName('lot').setDescription('Le lot').setRequired(true))
      .addIntegerOption(o => o.setName('gagnants').setDescription('Nb gagnants').setMinValue(1).setMaxValue(20).setRequired(true))
      .addStringOption(o => o.setName('duree').setDescription('Durée').setRequired(true).addChoices({ name: '1min', value: '60000' }, { name: '5min', value: '300000' }, { name: '1h', value: '3600000' }, { name: '1j', value: '86400000' }, { name: '1sem', value: '604800000' }))
      .addChannelOption(o => o.setName('salon').setDescription('Salon').setRequired(false)))
    .addSubcommand(s => s.setName('end').setDescription('Termine un giveaway').addStringOption(o => o.setName('id').setDescription('Message ID').setRequired(true))),
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand()
    if (sub === 'start') {
      const ch   = interaction.options.getChannel('salon') || interaction.channel
      const data = await gw.start(ch, { prize: interaction.options.getString('lot'), winners: interaction.options.getInteger('gagnants'), duration: parseInt(interaction.options.getString('duree')), hostedBy: interaction.user.toString() })
      client.giveaways.set(data.messageId, data)
      return interaction.reply({ embeds: [ok('Giveaway lancé dans ' + ch + ' !')], ephemeral: true })
    }
    if (sub === 'end') {
      const d = client.giveaways.get(interaction.options.getString('id'))
      if (!d) return interaction.reply({ embeds: [err('Giveaway introuvable.')], ephemeral: true })
      await gw.end(client, d); client.giveaways.delete(d.messageId)
      return interaction.reply({ embeds: [ok('Giveaway terminé.')], ephemeral: true })
    }
  },
}