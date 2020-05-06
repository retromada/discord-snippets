module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Displays the queue',
  category: 'music',
  execute(message) {
    const player = message.client.player.get(message.guild.id)

    if (!player || (player && !player.tracks.length)) return message.channel.send('The queue is empty ;-;', { code: 'nimrod' })

    message.channel.send(player.tracks.map((track, index, self) => `${index === 0 ? '     🡷 𝙽𝚘𝚠 𝚙𝚕𝚊𝚢𝚒𝚗𝚐\n' : ''}${index + 1}) ${track.title}${index === 0 && self.length > 1 ? '\n' : ''}`).join('\n'), { code: 'ml' })
  }
}