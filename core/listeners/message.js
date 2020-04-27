const _ = require('lodash')

module.exports = (client, message) => {
  try {
    const prefix = process.env.PREFIX

    if (message.author.bot || message.channel.type !== 'text' || !message.content.startsWith(prefix)) return

    const parameters = message.content.slice(prefix.length).split(/ +/)
    const commandName = parameters.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName))

    if (!command) return

    message.parameters = parameters
    command.requirements = _.defaults(command.requirements, {
      devOnly: false,
      parameters: false,
      permissions: [],
      needVoiceChannel: false
    })

    if (command.requirements.devOnly && message.author.id !== process.env.OWNER_ID) return
    if (command.requirements.parameters && !parameters.length) {
      return message.reply('need parameters.')
        .then(() => {
          if (command.usage) {
            message.channel.send(`${prefix}${command.name} ${command.usage}`, { code: 'fix' })
          }
        })
    }
    if (command.requirements.permissions.length) {
      const requiredPermissions = _.difference(command.requirements.permissions, message.member.permissions.toArray())

      if (requiredPermissions.length) return message.reply(`you need permissions: \`${requiredPermissions.join('\` \`')}\``)
    }
    if (command.requirements.needVoiceChannel && !message.member.voice.channel) return message.reply('go to a voice channel.')

    command.execute(message)
  } catch (error) {
    client.log(error)
  }
}