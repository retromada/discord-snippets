const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'song',
  aliases: ['np', 'nowplaying'],
  description: 'Specifies the current song playing',
  category: 'music',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || !queue.songs.length) return message.channel.send('There is no song playing!')

    const song = queue.songs.shift()

    message.channel.send(new MessageEmbed()
      .setTitle('Currently playing')
      .setDescription(`[${song.title}](${song.url}) [${song.requester}]`)
    )
  }
}