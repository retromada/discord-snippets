const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'leave',
  aliases: ['quit'],
  description: 'Disconnects from the voice channel and clears the entire queue',
  category: 'music',
  execute(message) {
    const { channel } = message.member.voice

    if (!channel) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Go to a voice channel!')
    )

    const queue = message.client.queue.get(message.guild.id)
    queue.songs = []
    queue.voice.leave()
    message.react('👋')
  }
}