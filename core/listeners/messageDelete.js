module.exports = (client, message) => {
  if (message.channel.id === client.registryChannels.activities) return

  message.guild.channels.cache.get(client.registryChannels.activities).send(message.content, { code: 'xl' })
}