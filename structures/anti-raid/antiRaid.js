const { EmbedBuilder }             = require('discord.js')
const { antiRaid, colors, channels } = require('../../../config')

async function checkRaid(member, client) {
  if (!antiRaid.enabled) return
  const gid  = member.guild.id
  if (!client.antiraid.has(gid)) client.antiraid.set(gid, { joins: [], locked: false })
  const data = client.antiraid.get(gid)
  const now  = Date.now()
  data.joins = data.joins.filter(t => now - t < antiRaid.joinInterval * 1000)
  data.joins.push(now)
  if (data.joins.length >= antiRaid.joinThreshold && !data.locked) {
    data.locked = true
    await triggerLockdown(member.guild, client)
  }
}

async function triggerLockdown(guild, client) {
  console.log(`[AntiRaid] 🚨 Lockdown — ${guild.name}`)
  for (const [, ch] of guild.channels.cache) {
    if (ch.isTextBased()) ch.permissionOverwrites.edit(guild.roles.everyone, { SendMessages: false }).catch(() => {})
  }
  const logCh = client.channels.cache.get(channels.logs)
  logCh?.send({ embeds: [new EmbedBuilder().setColor(colors.error).setTitle('🚨 RAID DÉTECTÉ — LOCKDOWN')
    .setDescription(`**${antiRaid.joinThreshold}+** joins en **${antiRaid.joinInterval}s** — Salons en lecture seule.`).setTimestamp()] }).catch(() => {})

  setTimeout(async () => {
    for (const [, ch] of guild.channels.cache) {
      if (ch.isTextBased()) ch.permissionOverwrites.edit(guild.roles.everyone, { SendMessages: null }).catch(() => {})
    }
    const d = client.antiraid.get(guild.id)
    if (d) { d.locked = false; d.joins = [] }
    console.log(`[AntiRaid] ✅ Lockdown levé — ${guild.name}`)
  }, antiRaid.lockdownDuration)
}

module.exports = { checkRaid, triggerLockdown }
