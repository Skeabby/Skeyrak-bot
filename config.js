/**
 * ╔══════════════════════════════════════════════════════╗
 * ║              CONFIGURATION DU BOT                   ║
 * ║   Remplis toutes les valeurs ci-dessous              ║
 * ╚══════════════════════════════════════════════════════╝
 */

module.exports = {

  // ─── DISCORD ───────────────────────────────────────────
  token:    'TON_TOKEN_ICI',           // Token du bot (Discord Developer Portal)
  clientId: 'TON_CLIENT_ID_ICI',       // Application ID (Discord Developer Portal)
  guildId:  'TON_GUILD_ID_ICI',        // ID de ton serveur (clic droit → Copier l'ID)
                                        // Mettre '' pour déploiement global (délai 1h)

  // ─── OWNERS ────────────────────────────────────────────
  ownerIds: [
    'TON_USER_ID_ICI',                  // Ton ID Discord (clic droit sur toi → Copier l'ID)
    // 'AUTRE_OWNER_ID',                // Ajouter d'autres owners si besoin
  ],

  // ─── SALONS ────────────────────────────────────────────
  channels: {
    logs:    'ID_SALON_LOGS',           // Salon pour les logs (joins, quitte, modération)
    welcome: 'ID_SALON_BIENVENUE',      // Salon de bienvenue (laisser '' pour désactiver)
  },

  // ─── ANTI-RAID ─────────────────────────────────────────
  antiRaid: {
    enabled:       true,                // Activer le système anti-raid automatique
    joinThreshold: 10,                  // Nombre de joins pour déclencher le lockdown
    joinInterval:  10,                  // Fenêtre de temps en secondes
    lockdownDuration: 5 * 60 * 1000,   // Durée du lockdown en ms (5 minutes)
  },

  // ─── APPARENCE ─────────────────────────────────────────
  colors: {
    primary: 0x5865F2,   // Bleu Discord
    success: 0x57F287,   // Vert
    error:   0xED4245,   // Rouge
    warn:    0xFEE75C,   // Jaune
    info:    0xEB459E,   // Rose
  },

  emojis: {
    success: '✅',
    error:   '❌',
    warn:    '⚠️',
    loading: '⏳',
    music:   '🎵',
    shield:  '🛡️',
    ticket:  '🎫',
    gift:    '🎁',
    stats:   '📊',
  },

  // ─── COOLDOWNS PAR DÉFAUT ──────────────────────────────
  defaultCooldown: 3,                   // Secondes entre chaque utilisation d'une commande

}
