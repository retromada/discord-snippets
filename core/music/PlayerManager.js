const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core')

const { YoutubeSong } = require('./sources')

module.exports = {
  async loadTracks(identifier, { client }) {
    const track = !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(identifier)
      ? await YoutubeSong.searchSongs(identifier, client.apis.youtube)
      : identifier

    return await YoutubeSong.loadInfo(track, ytdl)
  },

  play(track, message) {
    const player = message.client.player.get(message.guild.id)

    if (!track) return
    if (player.tracks.length && !player.playing) player.playing = true

    const dispatcher = player.connection.play(ytdl(track.url, { filter: 'audioonly' }))
      .on('finish', () => {
        player.message.delete()
        player.tracks.shift()

        if (!player.tracks.length) player.playing = false

        this.play(player.tracks[0], message)
      })
      .on('error', (error) => message.client.log(error))

    dispatcher.setVolumeLogarithmic(player.volume / 100)
    player.text.send(new MessageEmbed()
      .setTitle('Now playing')
      .setDescription(`[${track.title}](${track.url}) [${track.requester}]`)
    ).then((_message) => player.message = _message)
  }
}