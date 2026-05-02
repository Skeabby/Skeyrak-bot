const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js')

class ExtendedClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel, Partials.Message],
    })

    // Données en mémoire
    this.commands  = new Collection() // slash commands chargées
    this.cooldowns = new Collection() // anti-spam
    this.queue     = new Map()        // files musicales par guild
    this.giveaways = new Map()        // giveaways actifs
    this.snipes    = new Map()        // derniers messages supprimés
    this.antiraid  = new Map()        // données anti-raid par guild
    this.invites   = new Map()        // cache invitations
    this.tickets   = new Map()        // tickets ouverts
  }

  async start() {
    await require('../../src/handlers/commandHandler')(this)
    await require('../../src/handlers/eventHandler')(this)
    await this.login(require('../../config').token)
  }
}

module.exports = ExtendedClient
