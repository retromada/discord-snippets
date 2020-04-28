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
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || (queue && !queue.songs.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no queue.')
    )
    if (isNaN(track) || (!isNaN(track) && track > queue.songs.length)) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Provide the track number')
    )

    const song = queue.songs.splice(track - 1, 1)[0]
    message.channel.send(new MessageEmbed().setDescription(`Removed [${song.title}](${song.url}) [${song.requester}]`))
  }
}