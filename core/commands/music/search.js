const { MessageEmbed, Util } = require('discord.js')
const ytdl = require('ytdl-core')

const { PlayerManager } = require('../../music')
const { YoutubeSong } = require('../../music/sources')
const { DiscordUtils } = require('../../')

module.exports = {
  name: 'search',
  aliases: ['s'],
  description: 'Searches for your query on YouTube and lets you choose which songs to queue',
  usage: '[search query]',
  category: 'music',
  requirements: { parameters: true, needVoiceChannel: true },
  async execute(message) {
    try {
      const { channel } = message.member.voice
      const serverPlayer = message.client.player.get(message.guild.id)
      const tracksInfo = await YoutubeSong.searchSongs(message.parameters.join(' '), message.client.apis.youtube, 10, false)
      const _message = await message.channel.send(tracksInfo.map((track, index) => `${index < 9 ? ` ${index + 1}` : index + 1}) ${Util.escapeMarkdown(track.title)}`), { code: 'nimrod' })
      const choice = await DiscordUtils.verify(message.channel, message.author)

      if (!choice) return
      if (choice < 1 || choice > 10) return message.channel.send(new MessageEmbed()
        .setColor([255, 0, 0])
        .setDescription('Invalid number track.')
      )

      const trackInfo = await YoutubeSong.loadInfo(tracksInfo[choice - 1].id, ytdl)
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
        await message.leave()
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