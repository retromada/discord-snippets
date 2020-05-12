require('./core/utils/prototypes')

const CLIENT_OPTIONS = {
  disableMentions: 'everyone'
}

const Retromada = require('./core/Retromada.js')
const client = new Retromada(CLIENT_OPTIONS)

client.login(process.env.DISCORD_TOKEN)