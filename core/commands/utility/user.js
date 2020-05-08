const { MessageEmbed } = require('discord.js')
const { DiscordUtils } = require('../../')

module.exports = {
  name: 'user',
  aliases: [
    'uinfo',
    'userinfo',
    'member',
    'minfo',
    'memberinfo',
    'whois',
    'profile'
  ],
  description: 'Shows details about a user or yourself',
  usage: '<user>',
  category: 'utility',
  async execute(message) {
    const target = await message.client.users.fetch(DiscordUtils.resolveUser(message))

    message.guild.members.fetch(target.id)
      .then((member) => {
        const activity = member.presence.activities[0]
        const voice = member.voice

        message.channel.send(new MessageEmbed()
          .setColor(member.displayHexColor)
          .setTitle(member.user.tag)
          .setDescription(member)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
          .addFields([
            (this.insertIf(member.nickname, {
              name: 'Nickname',
              value: member.nickname,
            })), {
              name: 'ID',
              value: member.id,
            }, {
              name: 'Bot',
              value: member.user.bot ? 'Yes' : 'No'
            }, {
              name: 'Currently',
              value: `${member.presence.status}${member.presence.clientStatus && member.presence.clientStatus !== null && Object.keys(member.presence.clientStatus).length ? ` [${Object.keys(member.presence.clientStatus)[0]}]` : ''}`
            }, (this.insertIf(activity, {
              name: 'Activity',
              value: activity && (activity.state || activity.emoji)
                ? `${activity.emoji
                  ? `${activity.emoji}${activity.state ? ` ${activity.state}` : ''}`
                  : !activity.applicationID
                    ? activity.state
                    : [
                        activity.name,
                        activity.details,
                        activity.state
                      ].join('\n')} [${activity.type}]`
                : activity ? `${activity.type} ${activity.name}${activity.type === 'STREAMING' ? `\n${activity.url}` : ''}` : ''
            })), (this.insertIf(member.user.flags.toArray().length, {
              name: 'Flags',
              value: member.user.flags.toArray().join(' ')
            })), {
              name: 'Joined Server',
              value: member.joinedAt
            }, {
              name: 'Joined Discord',
              value: member.user.createdAt
            }, {
              name: 'Roles',
              value: member.roles.cache.size > 1 ? member.roles.cache.size - 1 : 0
            }, {
              name: 'Highest Role',
              value: member.roles.highest
            }, (this.insertIf(member.roles.hoist, {
              name: 'Hoist Role',
              value: member.roles.hoist
            })), (this.insertIf(voice.channelID, {
              name: 'Voice Channel',
              value: [
                voice.channel,
                `- Bitrate: ${voice.channel && voice.channel.bitrate.toString().slice(0, -3)}kbps`,
                `- User Limit: ${voice.channel && voice.channel.userLimit ? voice.channel.userLimit : 'Unlimited'}`
              ].join('\n')
            }))
          ]
          .filter(Boolean)
          .map((element) => ({ ...element, inline: true })))
        )
      })
      .catch((error) => {
        if (error.message === 'Unknown Member') {
          message.channel.send(new MessageEmbed()
            .setTitle(target.tag)
            .setDescription(target)
            .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
            .addFields([
              {
                name: 'ID',
                value: target.id
              }, {
                name: 'Bot',
                value: target.bot ? 'Yes' : 'No'
              }, {
                name: 'Currently',
                value: `${target.presence.status}${target.presence.clientStatus && target.presence.clientStatus && Object.keys(target.presence.clientStatus).length ? ` [${Object.keys(target.presence.clientStatus)[0]}]` : ''}`
              }, (this.insertIf(target.flags.toArray().length, {
                name: 'Flags',
                value: target.flags.toArray().join(' ')
              })), {
                name: 'Joined Discord',
                value: target.createdAt
              }
            ]
            .filter(Boolean)
            .map((element) => ({ ...element, inline: true })))
          )
        } else {
          message.channel.send(error.message, { code: 'fix' })
        }
      })
  },

  insertIf(condition, object) {
    return condition ? object : undefined
  }
}