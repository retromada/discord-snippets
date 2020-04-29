const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'song',
  aliases: ['np', 'nowplaying'],
  description: 'Specifies the current song playing',
  category: 'music',
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.tracks.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )

    const tracks = player.tracks

    message.channel.send(new MessageEmbed()
      .setTitle('Currently playing')
      .setDescription(`[${tracks[0].title}](${tracks[0].url}) [${tracks[0].requester}]`)
    )
  }
}