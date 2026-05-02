const { EmbedBuilder } = require('discord.js')
const { colors, ownerIds } = require('../../config')

// ─── Embeds rapides ────────────────────────────────────────────────────────────
const mkEmbed  = (desc, color = colors.primary) => new EmbedBuilder().setColor(color).setDescription(desc)
const ok       = desc => mkEmbed(desc, colors.success)
const err      = desc => mkEmbed(desc, colors.error)
const warn     = desc => mkEmbed(desc, colors.warn)
const info     = desc => mkEmbed(desc, colors.info)

// ─── Durée en texte lisible ────────────────────────────────────────────────────
const fmtMs = ms => {
  const s = Math.floor(ms/1000), m = Math.floor(s/60), h = Math.floor(m/60), d = Math.floor(h/24)
  if (d) return `${d}j ${h%24}h`
  if (h) return `${h}h ${m%60}m`
  if (m) return `${m}m ${s%60}s`
  return `${s}s`
}

// ─── Durée musique (mm:ss) ─────────────────────────────────────────────────────
const fmtTrack = ms => { const m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000); return `${m}:${s<10?'0':''}${s}` }

// ─── Parser durée (10m, 2h, 1d → ms) ─────────────────────────────────────────
const parseDur = str => { const m = str.match(/^(\d+)(s|m|h|d)$/); if (!m) return null; return parseInt(m[1]) * {s:1e3,m:6e4,h:36e5,d:864e5}[m[2]] }

// ─── Owner check ──────────────────────────────────────────────────────────────
const isOwner = id => ownerIds.includes(id)

module.exports = { mkEmbed, ok, err, warn, info, fmtMs, fmtTrack, parseDur, isOwner }
