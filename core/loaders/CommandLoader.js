const { Collection } = require('discord.js')
const { FileUtils } = require('../')

module.exports = {
  load(client) {
    this.initializeCommands(client)
  },

  initializeCommands(client, directory = 'core/commands') {
    client.commands = new Collection()
    client.aliases = new Collection()

    return FileUtils.requireDirectory(directory, (command) => {
      client.commands.set(command.name, command)

      if (command.aliases) {
        command.aliases.forEach((alias) => client.aliases.set(alias, command.name))
      }
    }, console.error)
  }
}