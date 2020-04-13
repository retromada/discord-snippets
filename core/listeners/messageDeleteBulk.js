const { MessageAttachment } = require('discord.js')

module.exports = (client, messages) => {
  const anchorMessage = messages.first()

  if (anchorMessage.channel.id === client.notifyChannels.universal) return

  anchorMessage.guild.channels.cache.get(client.notifyChannels.universal).send(new MessageAttachment(
    Buffer.from(messages.map((message) => `[${(new Date(message.createdAt)).toLocaleString()}] (${message.author.id}) ${message.author.tag} :: ${message.content}`).reverse().join('\n')),
    `deleted ${anchorMessage.channel.name} ${(new Date()).toLocaleString().split(':').join('-')}.log`
  ))
}