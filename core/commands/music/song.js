const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'song',
  aliases: ['np', 'nowplaying'],
  description: 'Specifies the current song playing',
  category: 'music',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || (queue && !queue.songs.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )

    const songs = queue.songs

    message.channel.send(new MessageEmbed()
      .setTitle('Currently playing')
      .setDescription(`[${songs[0].title}](${songs[0].url}) [${songs[0].requester}]`)
    )
  }
}