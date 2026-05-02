const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { ok } = require('../../utils/helpers')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('clear').setDescription('Supprime des messages').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(o => o.setName('nombre').setDescription('Nombre (1-100)').setMinValue(1).setMaxValue(100).setRequired(true))
    .addUserOption(o => o.setName('membre').setDescription('Filtrer par membre')),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })
    let msgs = await interaction.channel.messages.fetch({ limit: interaction.options.getInteger('nombre') })
    const t  = interaction.options.getUser('membre'); if (t) msgs = msgs.filter(m => m.author.id === t.id)
    const d  = await interaction.channel.bulkDelete(msgs, true)
    await interaction.editReply({ embeds: [ok(d.size + ' message(s) supprimé(s).')] })
  },
}