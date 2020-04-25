module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Displays the queue',
  category: 'music',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id)

    if (!queue || (queue && !queue.songs.length)) return message.channel.send('The queue is empty ;-;', { code: 'nimrod' })

    message.channel.send(queue.songs.map((song, index) => `${index + 1}) ${song.title}`).join('\n'), { code: 'ml' })
  }
}