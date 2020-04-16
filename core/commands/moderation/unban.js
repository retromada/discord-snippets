const { DiscordUtils } = require('../../')

module.exports = {
  name: 'unban',
  aliases: ['unbanne'],
  description: 'User unban management',
  usage: '[user]',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['BAN_MEMBERS'] },
  async execute(message) {
    let [target] = message.parameters
    target = await message.guild.fetchBans()
      .then((bans) => bans.find(({ user }) => user.username.toLowerCase().startsWith(target.toLowerCase()) || user.id === target))

    if (!target) return message.channel.send('Unknown User', { code: 'fix' })

    const _message = await message.channel.send(`Unban **${target.user.tag}**?`)
    const proof = await DiscordUtils.verify(message.channel, message.author)

    if (proof) {
      _message.delete()
      message.guild.members.unban(target.user)
        .then((user) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was unbanned.`))
        .catch((error) => console.log(error) && message.channel.send(error.message, { code: 'fix' }))
    } else {
      _message.delete()
      message.channel.send('Not unbanned')
    }
  }
}