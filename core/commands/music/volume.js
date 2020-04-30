const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  description: 'Sets the player volume',
  category: 'music',
  requirements: { needVoiceChannel: true },
  execute(message) {
    const [amount] = message.parameters
    const player = message.client.player.get(message.guild.id)

    if (!player || !player.tracks.length) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('There is no song playing!')
    )
    if (!amount) return message.channel.send(new MessageEmbed()
      .setTitle('Volume')
      .setDescription(`Current volume is **${player.volume}%** (${(player.connection.dispatcher.volumeLogarithmic).toFixed(1)})`)
    )
    if (isNaN(amount) || amount < 1 || amount > 100) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Enter a value between 1 and 100.')
    )

    player.volume = Number(amount)
    player.connection.dispatcher.setVolumeLogarithmic(amount / 100)
    message.channel.send(new MessageEmbed().setDescription(`Volume set to **${player.volume}%** (${(player.connection.dispatcher.volumeLogarithmic).toFixed(1)})`))
  }
}