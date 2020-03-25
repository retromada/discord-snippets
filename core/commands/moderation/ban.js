const { DiscordUtils } = require('../../')

module.exports = {
  name: 'ban',
  aliases: ['banne'],
  description: 'User ban management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['BAN_MEMBERS'] },
  execute(message) {
  	const reason = message.parameters.slice(1).join(' ')

  	message.guild.members.ban(DiscordUtils.resolveUser(message), {
      reason: `(Issued by ${message.author.tag})${reason ? ` ${reason}` : ''}`
    })
  	.then((user) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was banned. Reason: \`${reason ? reason : 'None'}\``))
  	.catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}