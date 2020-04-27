const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  description: 'Sets the player volume',
  category: 'music',
  execute(message) {
    const { channel } = message.member.voice

    if (!channel) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Go to a voice channel!')
    )

    const [amount] = message.parameters
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || !queue.songs.length) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )
    if (!amount) return message.channel.send(new MessageEmbed()
      .setTitle('Volume')
      .setDescription(`**${queue.volume}%** (${(queue.connection.dispatcher.volumeLogarithmic).toFixed(2)})`)
    )
    if (isNaN(amount) || amount < 1 || amount > 100) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Enter a value between 1 and 100.')
    )

    queue.volume = amount
    queue.connection.dispatcher.setVolumeLogarithmic(amount / 100)
    message.channel.send(new MessageEmbed().setDescription(`Volume set to **${queue.volume}%** (${(queue.connection.dispatcher.volumeLogarithmic).toFixed(2)})`))
  }
}