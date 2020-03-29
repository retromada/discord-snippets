const { DiscordUtils } = require('../../')

module.exports = {
  name: 'ban',
  aliases: ['banne'],
  description: 'User ban management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['BAN_MEMBERS'] },
  async execute(message) {
    try {
      const reason = message.parameters.slice(1).join(' ')
      const member = await message.guild.members.fetch(DiscordUtils.resolveUser(message))

      if (member) {
        const _message = await message.channel.send(`Ban **${member.user.tag}**?`)
        const proof = await DiscordUtils.verify(message.channel, message.author)

        if (proof) {
          _message.delete()
          member.ban({ reason: `(Issued by ${message.author.tag})${reason ? ` ${reason}` : ''}` })
            .then((user) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was banned. Reason: \`${reason ? reason : 'None'}\``))
            .catch((error) => message.channel.send(error.message, { code: 'fix' }))
        } else {
          _message.delete()
          message.channel.send('Not banned')
        }
      }
    } catch (error) {
      message.channel.send(error.message, { code: 'fix' })
    }
  }
}