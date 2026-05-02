const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { ok, err, warn } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('ticket').setDescription('Système de tickets')
    .addSubcommand(s => s.setName('panel').setDescription('Envoie le panel').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild))
    .addSubcommand(s => s.setName('close').setDescription('Ferme ce ticket'))
    .addSubcommand(s => s.setName('add').setDescription('Ajoute un membre').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true)))
    .addSubcommand(s => s.setName('remove').setDescription('Retire un membre').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true))),
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand()
    if (sub === 'panel') {
      const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_open').setLabel('📩 Ouvrir un ticket').setStyle(ButtonStyle.Primary))
      await interaction.channel.send({ embeds: [new EmbedBuilder().setColor(colors.primary).setTitle(emojis.ticket + ' Support').setDescription('Cliquez pour ouvrir un ticket.')], components: [row] })
      return interaction.reply({ embeds: [ok('Panel envoyé.')], ephemeral: true })
    }
    if (sub === 'close') {
      if (!client.tickets.has(interaction.channel.id)) return interaction.reply({ embeds: [err("Ce salon n'est pas un ticket.")], ephemeral: true })
      await interaction.reply({ embeds: [warn('Ticket fermé par ' + interaction.user + '. Suppression dans 3s...')] })
      setTimeout(() => { interaction.channel.delete().catch(() => {}); client.tickets.delete(interaction.channel.id) }, 3000)
    }
    if (sub === 'add')    { await interaction.channel.permissionOverwrites.edit(interaction.options.getMember('membre'), { ViewChannel: true, SendMessages: true }); return interaction.reply({ embeds: [ok(interaction.options.getMember('membre') + ' ajouté.')] }) }
    if (sub === 'remove') { await interaction.channel.permissionOverwrites.delete(interaction.options.getMember('membre')); return interaction.reply({ embeds: [ok(interaction.options.getMember('membre') + ' retiré.')] }) }
  },
}