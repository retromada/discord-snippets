const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'stop',
  aliases: [],
  description: 'Stops playback and clears the entire queue',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || (queue && !queue.playing)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Everything is already stopped.')
    )

    queue.songs = []
    queue.connection.dispatcher.end()
    queue.playing = false
    message.react('🛑')
  }
}