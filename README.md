<<<<<<< HEAD
# 🤖 Discord Bot — discord.js v14

Bot Discord complet, modulaire et prêt à déployer.

> ⚠️ **Configuration** : Tout se fait dans [`config.js`](./config.js) — pas de `.env` nécessaire.

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer le bot
# → Ouvre config.js et remplis toutes les valeurs

# 3. Lancer
npm start
```

---

## ⚙️ Configuration (`config.js`)

| Champ | Description | Où trouver |
|-------|-------------|------------|
| `token` | Token du bot | [Discord Developer Portal](https://discord.com/developers/applications) → Bot → Token |
| `clientId` | ID de l'application | Developer Portal → General Information → Application ID |
| `guildId` | ID de ton serveur | Clic droit sur le serveur → Copier l'ID (mode dev activé) |
| `ownerIds` | Tes IDs Discord | Clic droit sur ton profil → Copier l'ID |
| `channels.logs` | Salon de logs | Clic droit sur le salon → Copier l'ID |

---

## 📋 Commandes (32 au total)

| Commande | Catégorie | Permission |
|----------|-----------|------------|
| `/antiraid on/off/status` | Antiraid | Administrator |
| `/addbuyer` | Buyers | ManageRoles |
| `/contact` | Contact | Tout le monde (cd: 60s) |
| `/debug` | DEV | Owner only |
| `/ping` `/userinfo` `/serverinfo` `/stats` | Informations | Tout le monde |
| `/setlog` | Logs | Administrator |
| `/help` `/giveaway` `/ticket` | Misc | Selon commande |
| `/ban` `/kick` `/mute` `/clear` `/unban` `/warn` | Modération | Selon commande |
| `/play` `/skip` `/stop` `/pause` `/resume` `/queue` `/loop` | Musique | Tout le monde |
| `/eval` `/setactivity` `/servers` | Owner | Owner only |
| `/role add/remove` | Permissions | ManageRoles |
| `/avatar` `/snipe` `/invite` `/remind` | Utilitaires | Tout le monde |

---

## 📁 Structure

```
discord-bot/
├── config.js              ← ✏️  TOUT configurer ici
├── index.js               ← Point d'entrée
├── package.json
└── src/
    ├── handlers/           ← Chargement auto commandes + events
    ├── events/             ← ready, interactionCreate, guildMember...
    ├── utils/helpers.js    ← Fonctions utilitaires
    ├── structures/
    │   ├── client/         ← ExtendedClient + MusicQueue
    │   ├── anti-raid/      ← Détection + lockdown auto
    │   ├── giveaways/      ← Système de giveaways
    │   └── ticket/         ← Système de tickets
    └── commands/
        ├── Antiraid/
        ├── Buyers/
        ├── Contact/
        ├── DEV/
        ├── Informations/
        ├── Logs/
        ├── Misc/
        ├── Moderation/
        ├── Musique/
        ├── Owner/
        ├── Permissions/
        └── Utilitaires/
```

---

## ➕ Ajouter une commande

Crée un fichier dans `src/commands/TaCategorie/macommande.js` :

```js
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  cooldown: 5, // secondes (optionnel)

  data: new SlashCommandBuilder()
    .setName('macommande')
    .setDescription('Description'),

  async execute(interaction, client) {
    await interaction.reply('Hello !')
  },
}
```

Redémarre → la commande est **automatiquement chargée et déployée**. ✅

---

## 🎵 Musique (requis)

La musique nécessite `ffmpeg` :

```bash
# Ubuntu / Debian / VPS
sudo apt update && sudo apt install ffmpeg -y

# macOS
brew install ffmpeg
```

---

## 🖥️ Hébergement recommandé

### VPS (recommandé pour 24/7)
```bash
# Installer PM2 pour garder le bot actif
npm install -g pm2
pm2 start index.js --name discord-bot
pm2 save
pm2 startup   # démarrage auto au reboot
```

**VPS recommandés :** [Contabo](https://contabo.com) (~3€/mois) · [Hetzner](https://hetzner.com) (~4€/mois) · [OVH](https://ovh.com)

### Hébergement gratuit
- [Discloud](https://discloudbot.com) — spécialisé bots Discord
- [Railway](https://railway.app) — 5$/mois crédits offerts
- [Render](https://render.com) — gratuit (s'endort après 15min d'inactivité)

---

## 📝 Notes

- Les avertissements (`/warn`) sont stockés **en mémoire** — ils se réinitialisent au redémarrage. Pour les persister, remplace le `Map` par une base de données (ex: [quick.db](https://quickdb.js.org), MongoDB).
- L'anti-raid se configure dans `config.js` → section `antiRaid`.
- Pour déployer les commandes **globalement** (sur tous les serveurs), laisse `guildId: ''` dans `config.js`.

---

## 📄 Licence

MIT — libre d'utilisation, modification et distribution.
=======
# Skeyrak-bot
Discord multifunction bot like famous ones , crowbot
>>>>>>> c06f86652213c018c32bc43d58e125e515f557d0
