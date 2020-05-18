const util = require('util')

module.exports = {
  name: 'users',
  aliases: [],
  description: 'Manages users in the database',
  usage: '[(-a|--add)|(-r|--remove)|(-g|--get)] [@user]',
  category: 'developers',
  requirements: { devOnly: true, parameters: true },
  async execute(message) {
    try {
      const target = message.mentions.members.first()

      if (!message.parameters.length || !target) return

      if (['-A', '--ADD'].includes(message.parameters[0].toUpperCase())) {
        const userExists = await message.client.database.users.findOne(target.id)

        if (userExists) return message.channel.send(this._solverUser(userExists), { code: 'js' })

        await message.client.database.users.add(target)
        message.client.database.users.findOne(target.id)
          .then((user) => message.channel.send(this._solverUser(user), { code: 'js' }))
      } else if (['-R', '--REMOVE'].includes(message.parameters[0].toUpperCase())) {
        message.client.database.users.remove(target.id)
          .then((user) => message.channel.send(this._solverUser(user), { code: 'js' }))
      } else if (['-G', '--GET'].includes(message.parameters[0].toUpperCase())) {
        message.client.database.users.findOne(target.id)
          .then((user) => message.channel.send(this._solverUser(user), { code: 'js' }))
      }
    } catch (error) {
      message.channel.send(error.message, { code: 'fix' })
    }
  },

  _solverUser(user) {
    return util.inspect(eval(user), { depth: 0 })
  }
}