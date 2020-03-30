const { Client } = require('discord.js')
const Loaders = require('./loaders')

module.exports = class Retromada extends Client {
  constructor(options) {
    super(options)

    this.notifyChannels = {
      joinAndLeave: process.env.NOTIFY_JOIN_LEAVE_CHANNEL_ID,
      universal: process.env.NOTIFY_UNIVERSAL_CHANNEL_ID
    }

    this.initializeLoaders()
  }

  log(message) {
    console.log(message)
  }

  async initializeLoaders() {
    for (let name in Loaders) {
      await Loaders[name].load(this)
    }
  }
}