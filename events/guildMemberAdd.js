const { Events, EmbedBuilder } = require('discord.js')
const { colors, channels }     = require('../../config')
const { checkRaid }            = require('../structures/anti-raid/antiRaid')

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {

    // Anti-raid
    await checkRaid(member, client)

    // Cache invitations
    try {
      const fresh = await member.guild.invites.fetch()
      const old   = client.invites.get(member.guild.id) || new Map()
      const used  = fresh.find(i => (old.get(i.code) ?? 0) < i.uses)
      client.invites.set(member.guild.id, new Map(fresh.map(i => [i.code, i.uses])))
      if (used) console.log(`[Invite] ${member.user.tag} via ${used.inviter?.tag} (${used.code})`)
    } catch {}

    // Log
    const ch = client.channels.cache.get(channels.logs)
    if (!ch) return
    ch.send({ embeds: [new EmbedBuilder().setColor(colors.success).setTitle('👋 Nouveau membre')
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'Membre',        value: `${member.user.tag} (\`${member.id}\`)`, inline: true },
        { name: 'Compte créé',   value: `<t:${Math.floor(member.user.createdTimestamp/1000)}:R>`, inline: true },
        { name: 'Total membres', value: `${member.guild.memberCount}`, inline: true },
      ).setTimestamp()] }).catch(() => {})
  },
}
