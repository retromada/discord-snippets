const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'song',
  aliases: ['np', 'nowplaying'],
  description: 'Specifies the current song playing',
  category: 'music',
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.songs.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )

    const songs = player.songs

    message.channel.send(new MessageEmbed()
      .setTitle('Currently playing')
      .setDescription(`[${songs[0].title}](${songs[0].url}) [${songs[0].requester}]`)
    )
  }
}