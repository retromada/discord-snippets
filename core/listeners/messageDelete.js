const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
  if (message.channel.id === client.notifyChannels.universal) return

  message.guild.channels.cache.get(client.notifyChannels.universal).send(new MessageEmbed()
    .setColor([255, 0, 0])
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
    .addField('Channel', message.channel)
    .addField('Content', message.content)
    .setFooter(message.createdAt)
  )
}