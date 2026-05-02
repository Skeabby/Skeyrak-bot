const { Events, EmbedBuilder } = require('discord.js')
const { colors, emojis, defaultCooldown } = require('../../config')

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {

    // ── Slash commands ──────────────────────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName)
      if (!cmd) return

      // Cooldown
      const cd  = cmd.cooldown ?? defaultCooldown
      const key = `${interaction.user.id}:${cmd.data.name}`
      const now = Date.now()
      if (client.cooldowns.has(key)) {
        const left = ((client.cooldowns.get(key) - now) / 1000).toFixed(1)
        if (now < client.cooldowns.get(key))
          return interaction.reply({ embeds: [new EmbedBuilder().setColor(colors.warn).setDescription(`${emojis.warn} Attendez encore **${left}s**.`)], ephemeral: true })
      }
      client.cooldowns.set(key, now + cd * 1000)
      setTimeout(() => client.cooldowns.delete(key), cd * 1000)

      // Exécution
      try {
        await cmd.execute(interaction, client)
      } catch (e) {
        console.error(`[CMD] /${cmd.data.name} :`, e)
        const reply = { embeds: [new EmbedBuilder().setColor(colors.error).setDescription(`${emojis.error} Une erreur s'est produite.`)], ephemeral: true }
        interaction.replied || interaction.deferred ? interaction.followUp(reply) : interaction.reply(reply)
      }
    }

    // ── Boutons ─────────────────────────────────────────────────────────────────
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('ticket_'))   return require('../structures/ticket/ticketHandler')(interaction, client)
      if (interaction.customId.startsWith('giveaway_')) return require('../structures/giveaways/giveawayHandler').onButton(interaction, client)
    }
  },
}
