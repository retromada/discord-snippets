const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'stop',
  aliases: [],
  description: 'Stops playback and clears the entire queue',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.playing)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Everything is already stopped.')
    )

    player.tracks = []
    player.connection.dispatcher.end()
    player.playing = false
    message.react('🛑')
  }
}