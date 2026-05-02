const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { ok, warn, mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
const store = new Map()
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('warn').setDescription('Gère les avertissements').setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand(s => s.setName('add').setDescription('Ajouter').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true)).addStringOption(o => o.setName('raison').setDescription('Raison').setRequired(true)))
    .addSubcommand(s => s.setName('list').setDescription('Lister').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true)))
    .addSubcommand(s => s.setName('clear').setDescription('Effacer').addUserOption(o => o.setName('membre').setDescription('Membre').setRequired(true))),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand(), t = interaction.options.getMember('membre'), k = interaction.guild.id + ':' + t.id
    if (sub === 'add') {
      const r = interaction.options.getString('raison'); if (!store.has(k)) store.set(k, []); store.get(k).push({ r, by: interaction.user.tag })
      try { await t.send({ embeds: [warn('Avertissement sur **' + interaction.guild.name + '** : ' + r)] }) } catch {}
      return interaction.reply({ embeds: [warn(t + ' avert #' + store.get(k).length + ' — ' + r)] })
    }
    if (sub === 'list') {
      const list = store.get(k) || []; if (!list.length) return interaction.reply({ embeds: [ok('Aucun avert.')], ephemeral: true })
      return interaction.reply({ embeds: [mkEmbed(list.map((w, i) => '#' + (i+1) + ' ' + w.r + ' — par ' + w.by).join('
'), colors.warn).setTitle('Averts de ' + t.user.tag)] })
    }
    if (sub === 'clear') { store.delete(k); return interaction.reply({ embeds: [ok('Averts effacés.')] }) }
  },
}