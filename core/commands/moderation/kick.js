module.exports = {
  name: 'kick',
  description: 'This command allows you to kick a member',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['KICK_MEMBERS'] },
  async execute(message) {
  	const member = await message.client.users.fetch(DiscordUtils.resolveUser(message))
  	const reason = message.parameters.slice(1).join(' ')

  	member.kick({ reason })
  		.then((member) => message.channel.send(`${member.user.tag} was banned.\nReason: ${reason ? reason : 'None'}`))
  		.catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}