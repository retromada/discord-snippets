const { MessageEmbed, Util } = require('discord.js')
const ytdl = require('ytdl-core')

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play your entries or add the queue if something is already playing',
  usage: '[link]',
  category: 'music',
  requirements: { parameters: true },
  async execute(message) {
    const { channel } = message.member.voice

    if (!channel) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Go to a voice channel!')
    )

    try {
      const serverQueue = message.client.queue.get(message.guild.id)
      const songInfo = await ytdl.getInfo(message.parameters[0].replace(/<(.+)>/g, '$1'))
      const song = {
        id: songInfo.video_id,
        title: Util.escapeMarkdown(songInfo.title),
        url: songInfo.video_url,
        duration: Number(songInfo.length_seconds) * 1E3,
        requester: message.author
      }

      if (serverQueue && serverQueue.playing) {
        serverQueue.songs.push(song)
        return message.channel.send(new MessageEmbed().setDescription(`Queued [${song.title}](${song.url}) [${song.requester}]`))
      }

      const queueObject = {
        text: message.channel,
        voice: channel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true
      }

      message.client.queue.set(message.guild.id, queueObject)
      queueObject.songs.push(song)

      const play = (song) => {
        const queue = message.client.queue.get(message.guild.id)

        if (!song) return
        if (queue.songs.length && !queue.playing) queue.playing = true

        const dispatcher = queue.connection.play(ytdl(song.url, { filter: 'audioonly' }))
          .on('finish', () => {
            queue.songs.shift()
            play(queue.songs[0])

            if (!queue.songs.length) queue.playing = false
          })
          .on('error', (error) => message.client.log(error))
        dispatcher.setVolumeLogarithmic(queue.volume / 100)
        queue.text.send(new MessageEmbed()
          .setTitle('Now playing')
          .setDescription(`[${song.title}](${song.url}) [${song.requester}]`)
        ).then((_message) => _message.delete({ timeout: song.duration }))
      }

      try {
        const connection = await channel.join()
        queueObject.connection = connection
        play(queueObject.songs[0])
      } catch (error) {
        message.client.log(error)
        message.client.queue.delete(message.guild.id)
        await channel.leave()
        return message.channel.send(new MessageEmbed()
          .setColor([255, 0, 0])
          .setDescription(error.message)
        )
      }
    } catch (error) {
      message.channel.send(new MessageEmbed()
        .setColor([255, 0, 0])
        .setDescription(error.message)
      )
    }
  }
}