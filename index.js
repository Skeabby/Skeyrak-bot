const ExtendedClient = require('./src/structures/client/ExtendedClient')

const client = new ExtendedClient()
module.exports = client

client.start().catch(err => {
  console.error('❌ Erreur fatale au démarrage :', err)
  process.exit(1)
})

process.on('uncaughtException',  err  => { if (![50013,50001,50035,10062].includes(err.code))  console.error('[Exception]', err) })
process.on('unhandledRejection', reason => console.error('[Rejection]', reason))
