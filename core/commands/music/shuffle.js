const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'shuffle',
  aliases: ['randomize'],
  description: 'Randomizes the tracks in the queue',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && player.tracks.length < 3)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription(player ? 'Provide more songs to shuffle.' : 'There is nothing playing.')
    )

    const tracks = player.tracks.slice(1).sort(() => Math.random() - .5)
    player.tracks.slice(0, 1).push(...tracks)
    message.react('🔄')
  }
}