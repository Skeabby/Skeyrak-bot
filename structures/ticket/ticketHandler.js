const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')
const { colors, emojis } = require('../../../config')

module.exports = async (interaction, client) => {
  const { customId, guild, user, channel } = interaction

  if (customId === 'ticket_open') {
    const existing = guild.channels.cache.find(c => c.name === `ticket-${user.username.toLowerCase()}`)
    if (existing) return interaction.reply({ content: `${emojis.warn} Ticket déjà ouvert : ${existing}`, ephemeral: true })

    const ch = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: guild.roles.everyone, deny: [PermissionFlagsBits.ViewChannel] },
        { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
      ],
      topic: `Ticket de ${user.tag} | ID: ${user.id}`,
    })

    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_close').setLabel('🔒 Fermer').setStyle(ButtonStyle.Danger))
    await ch.send({ content: `${user}`, embeds: [new EmbedBuilder().setColor(colors.primary).setTitle(`${emojis.ticket} Ticket de ${user.username}`).setDescription('Décrivez votre problème, un staff vous répondra.\nCliquez sur **Fermer** pour clore ce ticket.').setTimestamp()], components: [row] })
    await interaction.reply({ content: `${emojis.success} Ticket créé : ${ch}`, ephemeral: true })
    client.tickets.set(ch.id, { userId: user.id, createdAt: Date.now() })
  }

  if (customId === 'ticket_close') {
    if (!client.tickets.has(channel.id)) return interaction.reply({ content: `${emojis.error} Ce salon n'est pas un ticket.`, ephemeral: true })
    await interaction.reply({ embeds: [new EmbedBuilder().setColor(colors.warn).setDescription(`${emojis.warn} Ticket fermé par ${user}. Suppression dans 3s...`)] })
    setTimeout(() => { channel.delete().catch(() => {}); client.tickets.delete(channel.id) }, 3000)
  }
}
