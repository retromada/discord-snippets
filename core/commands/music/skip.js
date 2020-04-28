const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'skip',
  aliases: ['next'],
  description: 'Skip to the next track',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.songs.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )

    player.connection.dispatcher.end()
    message.react('👌')
  }
}