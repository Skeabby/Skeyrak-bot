const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { colors, emojis } = require('../../../config')

async function start(channel, { prize, winners, duration, hostedBy }) {
  const endsAt = Date.now() + duration
  const embed  = new EmbedBuilder().setColor(colors.primary).setTitle(`🎁 GIVEAWAY — ${prize}`)
    .setDescription('Cliquez sur 🎉 pour participer !')
    .addFields({ name: 'Fin dans', value: `<t:${Math.floor(endsAt/1000)}:R>`, inline: true }, { name: 'Gagnant(s)', value: `${winners}`, inline: true }, { name: 'Organisé par', value: hostedBy, inline: true })
    .setTimestamp(endsAt).setFooter({ text: 'Se termine le' })
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('giveaway_enter').setLabel('🎉 Participer').setStyle(ButtonStyle.Primary))
  const msg = await channel.send({ embeds: [embed], components: [row] })
  const data = { prize, winners, hostedBy, endsAt, participants: new Set(), messageId: msg.id, channelId: channel.id }
  setTimeout(() => end(channel.client, data), duration)
  return data
}

async function onButton(interaction, client) {
  let gw = null
  for (const [, g] of client.giveaways) { if (g.messageId === interaction.message.id) { gw = g; break } }
  if (!gw || Date.now() > gw.endsAt) return interaction.reply({ content: `${emojis.error} Giveaway terminé.`, ephemeral: true })
  if (gw.participants.has(interaction.user.id)) {
    gw.participants.delete(interaction.user.id)
    return interaction.reply({ content: `${emojis.warn} Vous avez quitté le giveaway.`, ephemeral: true })
  }
  gw.participants.add(interaction.user.id)
  return interaction.reply({ content: `${emojis.success} Vous participez au giveaway **${gw.prize}** !`, ephemeral: true })
}

async function end(client, gw) {
  const channel = client.channels.cache.get(gw.channelId)
  if (!channel) return
  const pool = [...gw.participants]
  if (!pool.length) return channel.send({ embeds: [new EmbedBuilder().setColor(colors.error).setDescription('🎁 Giveaway terminé — Aucun participant.')] })
  const winners = []
  const tmp = [...pool]
  for (let i = 0; i < Math.min(gw.winners, tmp.length); i++) winners.push(tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0])
  const mentions = winners.map(id => `<@${id}>`).join(', ')
  channel.send({ content: mentions, embeds: [new EmbedBuilder().setColor(colors.success).setTitle(`🎉 Giveaway terminé — ${gw.prize}`).setDescription(`Félicitations ${mentions} !`).addFields({ name: 'Participants', value: `${pool.length}` }).setTimestamp()] })
}

module.exports = { start, onButton, end }
