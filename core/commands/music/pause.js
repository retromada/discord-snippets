const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'pause',
  aliases: [],
  description: 'Pauses playback',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.playing)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is nothing playing.')
    )

    player.playing = false
    player.connection.dispatcher.pause(true)
    message.react('⏸')
  }
}