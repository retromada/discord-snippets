module.exports = {
  resolveUser(message, id) {
    const members = message.guild.members.cache

    if (message.mentions.members.size) {
      id = message.mentions.members.first().id
    } else if (!isNaN(message.parameters[0])) {
      if (members.get(message.parameters[0])) {
        id = members.get(message.parameters[0]).id
      } else {
        id = /^([0-9]){18}$/.test(message.parameters[0]) ? message.parameters[0] : message.member.id
      }
    } else if (isNaN(message.parameters.join(' '))) {
      const username = message.parameters.join(' ').toLowerCase()
      const member = members.filter(({ user }) => user.username.toLowerCase().startsWith(username)).first()

      id = member ? member.id : message.member.id
    } else {
      id = message.member.id
    }

    return id
  },

  async verify(channel, user, time = 30000) {
    const verify = await channel.awaitMessages((message) => {
      const value = message.content.toLowerCase()
      return (user ? message.author.id === user.id : true) && !isNaN(value)
    }, { max: 1, time })

    if (!verify.size) return

    const choice = verify.first().content

    if (choice) return choice
    return false
  }
}