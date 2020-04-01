const { MessageEmbed } = require('discord.js')

module.exports = (client, message, _message) => {
  if (message.channel.id === client.notifyChannels.universal || message.content === _message.content) return

  message.guild.channels.cache.get(client.notifyChannels.universal).send(new MessageEmbed()
    .setColor([255, 255, 0])
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
    .addField('Channel', message.channel)
    .addField('Before', message.content)
    .addField('After', _message.content)
    .setFooter(message.createdAt)
  )
}