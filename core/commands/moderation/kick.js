const { DiscordUtils } = require('../../')

module.exports = {
  name: 'kick',
  aliases: [],
  description: 'User expulsion management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['KICK_MEMBERS'] },
  async execute(message) {
    try {
      const reason = message.parameters.slice(1).join(' ')
      const member = await message.guild.members.fetch(DiscordUtils.resolveUser(message))

      if (!member || member.id === message.author.id || member.id === message.client.user.id) return

      const _message = await message.channel.send(`Kick **${member.user.tag}**?`)
      const proof = await DiscordUtils.verify(message.channel, message.author)

      if (proof) {
        _message.delete()
        member.kick(reason)
          .then(({ user }) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was kicked. Reason: \`${reason ? reason : 'None'}\``))
          .catch((error) => message.channel.send(error.message, { code: 'fix' }))
      } else {
        _message.delete()
        message.channel.send('Not kicked')
      }
    } catch (error) {
      message.channel.send(error.message, { code: 'fix' })
    }
  }
}