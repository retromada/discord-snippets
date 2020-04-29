const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'remove',
  aliases: ['del', 'delete'],
  description: 'Removes the specified track from the queue',
  usage: '[track]',
  category: 'music',
  requirements: { parameters: true, needVoiceChannel: true },
  execute(message) {
    const [track] = message.parameters
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.tracks.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no queue.')
    )
    if (isNaN(track) || (!isNaN(track) && track > player.tracks.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Provide the track number')
    )

    const song = player.tracks.splice(track - 1, 1)[0]
    message.channel.send(new MessageEmbed().setDescription(`Removed [${song.title}](${song.url}) [${song.requester}]`))
  }
}