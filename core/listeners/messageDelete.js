const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
  if (message.channel.id === client.notifyChannels.universal) return

  message.guild.channels.cache.get(client.notifyChannels.universal).send(new MessageEmbed()
    .setColor([255, 0, 0])
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
    .addField('Channel', message.channel)
    .addField('Content',
      message.content && !message.attachments.first()
      ? message.content
      : !message.embeds.length
        ? [message.content, message.attachments.first().url].join('\n')
        : (message.embeds
            .forEach((embed) => Object.keys(embed).forEach((key) => (embed[key] === undefined || embed[key] === null || !embed[key].length) && delete embed[key])),
           message.embeds
            .map((embed) => Object.entries(embed).map(([key, value]) => `**${key}**: ${value}`).join('\n'))
            .join('\n\n')
          )
    )
    .setFooter(message.createdAt)
  )
}