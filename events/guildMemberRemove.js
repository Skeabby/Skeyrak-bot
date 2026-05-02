const { Events, EmbedBuilder } = require('discord.js')
const { colors, channels }     = require('../../config')

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member, client) {
    const ch = client.channels.cache.get(channels.logs)
    if (!ch) return
    ch.send({ embeds: [new EmbedBuilder().setColor(colors.error).setTitle('🚪 Membre parti')
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'Membre',        value: `${member.user.tag} (\`${member.id}\`)`, inline: true },
        { name: 'Avait rejoint', value: member.joinedAt ? `<t:${Math.floor(member.joinedTimestamp/1000)}:R>` : 'Inconnu', inline: true },
        { name: 'Total membres', value: `${member.guild.memberCount}`, inline: true },
      ).setTimestamp()] }).catch(() => {})
  },
}
