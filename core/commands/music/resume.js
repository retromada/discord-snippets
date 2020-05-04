const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'resume',
  aliases: ['unpause'],
  description: 'Resumes playback',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && player.playing)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription(player ? 'A track is already playing.' : 'There is nothing to be playing.')
    )

    player.playing = true
    player.connection.dispatcher.resume()
    message.react('▶')
  }
}