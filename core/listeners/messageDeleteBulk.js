const { MessageAttachment } = require('discord.js')

module.exports = (client, messages) => {
  const { channel, guild } = messages.first()

  if (channel.id === client.notifyChannels.universal) return

  guild.channels.cache.get(client.notifyChannels.universal).send(new MessageAttachment(
    Buffer.from(messages.map((message) => `[${(new Date(message.createdAt)).toLocaleString()}] (${message.author.id}) ${message.author.tag} :: ${message.content}`).reverse().join('\n')),
    `deleted ${channel.name} ${(new Date()).toLocaleString().replace(/:/g, '-')}.log`
  ))
}