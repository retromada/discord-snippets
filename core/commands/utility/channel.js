const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'channel',
  aliases: ['cinfo', 'channelinfo'],
  description: 'Shows details about the channel',
  category: 'utility',
  execute(message) {
    const channel = message.channel

    channel.send(new MessageEmbed()
      .setTitle(channel.name)
      .setDescription(message.channel)
      .addFields([
        {
          name: 'ID',
          value: channel.id,
          inline: false
        }, {
          name: 'Type',
          value: channel.type
        }, {
          name: 'NSFW',
          value: channel.nsfw
        }, {
          name: 'Creation Date',
          value: channel.createdAt
        }, {
          name: 'Topic',
          value: channel.topic,
          inline: false
        }
      ].map((element) => element.inline !== false ? ({ ...element, inline: true }) : element))
    )
  }
}