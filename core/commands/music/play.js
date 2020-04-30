const { MessageEmbed, Util } = require('discord.js')
const { PlayerManager } = require('../../music')

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play your entries or add the queue if something is already playing',
  usage: '[search query|youtube url]',
  category: 'music',
  requirements: { parameters: true, needVoiceChannel: true },
  async execute(message) {
    try {
      const { channel } = message.member.voice
      const serverPlayer = message.client.player.get(message.guild.id)
      const trackInfo = await PlayerManager.loadTracks(message.parameters.join(' '), message)
      const track = {
        id: trackInfo.video_id,
        title: Util.escapeMarkdown(trackInfo.title),
        url: trackInfo.video_url,
        duration: Number(trackInfo.length_seconds) * 1E3,
        requester: message.author
      }

      if (serverPlayer && serverPlayer.playing) {
        serverPlayer.tracks.push(track)
        return message.channel.send(new MessageEmbed().setDescription(`Queued [${track.title}](${track.url}) [${track.requester}]`))
      }

      const playerObject = {
        text: message.channel,
        voice: channel,
        connection: null,
        tracks: [],
        volume: serverPlayer && serverPlayer.volume || 100,
        playing: true
      }

      message.client.player.set(message.guild.id, playerObject)
      playerObject.tracks.push(track)

      try {
        const connection = await channel.join()
        playerObject.connection = connection
        PlayerManager.play(playerObject.tracks[0], message)
      } catch (error) {
        message.client.log(error)
        message.client.player.delete(message.guild.id)
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