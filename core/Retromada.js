const { Client } = require('discord.js')
const Loaders = require('./loaders')
const {
  NOTIFY_JOIN_LEAVE_CHANNEL_ID,
  NOTIFY_BAN_UNBAN_CHANNEL_ID,
  NOTIFY_UNIVERSAL_CHANNEL_ID
} = process.env

module.exports = class Retromada extends Client {
  constructor(options) {
    super(options)

    this.queue = new Map()
    this.notifyChannels = {
      joinAndLeave: NOTIFY_JOIN_LEAVE_CHANNEL_ID,
      banAndUnban: NOTIFY_BAN_UNBAN_CHANNEL_ID,
      universal: NOTIFY_UNIVERSAL_CHANNEL_ID
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