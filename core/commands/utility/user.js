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
              value: `${member.presence.status}${member.presence.clientStatus ? ` [${Object.keys(member.presence.clientStatus)[0]}]` : ''}`
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
                : `${activity && activity.type} ${activity && activity.name}${activity.type === 'STREAMING' ? `\n${activity.url}` : ''}`
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
            .addField('ID', target.id, true)
            .addField('Bot', target.bot ? 'Yes' : 'No', true)
            .addField('Currently', `${target.presence.status}${target.presence.clientStatus ? ` [${Object.keys(target.presence.clientStatus)[0]}]` : ''}`, true)
            .addField('Joined Discord', target.createdAt, true)
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