module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Displays the queue',
  category: 'music',
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.songs.length)) return message.channel.send('The queue is empty ;-;', { code: 'nimrod' })

    message.channel.send(player.songs.map((song, index) => `${index + 1}) ${song.title}`).join('\n'), { code: 'ml' })
  }
}