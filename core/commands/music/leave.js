const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'leave',
  aliases: ['quit'],
  description: 'Disconnects from the voice channel and clears the entire queue',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const queue = message.client.queue.get(message.guild.id)
    queue.songs = []
    queue.voice.leave()
    message.react('👋')
  }
}