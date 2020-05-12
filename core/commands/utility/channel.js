const { MessageEmbed } = require('discord.js')
const { Utils } = require('../../')

module.exports = {
  name: 'channel',
  aliases: ['cinfo', 'channelinfo'],
  description: 'Shows details about the channel',
  usage: '<channel>',
  category: 'utility',
  execute(message, channelID) {
    if (message.mentions.channels.size) {
      channelID = message.mentions.channels.first().id
    } else if (isNaN(message.parameters.join('-'))) {
      const channelName = message.parameters.join('-').toLowerCase()
      const channel = message.guild.channels.cache.find((channel) => channel.name.includes(channelName))

      channelID = channel ? channel.id : message.channel.id
    } else if (!isNaN(message.parameters[0])) {
      channelID = message.parameters[0]
    } else {
      channelID = message.channel.id
    }

    const channels = message.guild.channels.cache

    if (!channels.has(channelID)) return

    const channel = channels.get(channelID)

    message.channel.send(new MessageEmbed()
      .setTitle(channel.name)
      .setDescription(channel)
      .addFields([
        {
          name: 'ID',
          value: channel.id
        }, {
          name: 'Type',
          value: channel.type
        }, (Utils.insertIf(channel.type === 'text', {
          name: 'NSFW',
          value: channel.nsfw ? 'Enabled' : 'Disabled'
        })), {
          name: 'Creation Date',
          value: channel.createdAt
        }, (Utils.insertIf(channel.type === 'text' && channel.topic, {
          name: 'Topic',
          value: channel.topic,
          inline: false
        }))
      ]
      .filter(Boolean)
      .map((element) => element.inline !== false ? ({ ...element, inline: true }) : element))
    )
  }
}