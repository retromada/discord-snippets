const { DiscordUtils } = require('../../')

module.exports = {
  name: 'kick',
  aliases: [],
  description: 'User expulsion management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['KICK_MEMBERS'] },
  execute(message) {
  	const reason = message.parameters.slice(1).join(' ')

  	message.guild.members.fetch(DiscordUtils.resolveUser(message)).kick(reason)
  		.then(({ user }) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was kicked. Reason: \`${reason ? reason : 'None'}\``))
  		.catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}