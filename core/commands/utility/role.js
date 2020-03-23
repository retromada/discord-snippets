const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'role',
  aliases: ['rinfo', 'roleinfo'],
  description: 'Shows detailed information on a role',
  usage: '[role]',
  category: 'utility',
  requirements: { parameters: true },
  execute(message, roleID) {
    if (message.mentions.roles.size) {
      roleID = message.mentions.roles.first().id
    } else if (isNaN(message.parameters.join(' '))) {
      const roleName = message.parameters.join(' ').toLowerCase()
      const role = message.guild.roles.cache.filter((role) => role.name.toLowerCase().startsWith(roleName)).first()

      roleID = role ? role.id : message.member.roles.highest.id
    } else {
      roleID = message.parameters[0]
    }

    message.guild.roles.fetch(roleID)
      .then((role) => {
        const users = role.members.filter(({ user }) => !user.bot)
        const bots = role.members.filter(({ user }) => user.bot)

        message.channel.send(new MessageEmbed()
          .setColor(role.hexColor)
          .setThumbnail(`https://dummyimage.com/64/${role.hexColor.repeat(2).split('#').filter(Boolean).join('/')}`)
          .addFields([
            {
              name: 'Name',
              value: role.name
            }, {
              name: 'ID',
              value: role.id
            }, {
              name: 'Color',
              value: role.hexColor.toUpperCase()
            }, {
              name: 'Creation Date',
              value: role.createdAt
            }, {
              name: 'Hoisted',
              value: role.hoist ? 'Yes' : 'No'
            }, {
              name: 'Mentionable',
              value: role.Mentionable ? 'Yes' : 'No'
            }, {
              name: 'Editable by me',
              value: role.editable ? 'Yes' : 'No'
            }, {
              name: 'Position',
              value: `${message.guild.roles.cache.size - role.position}/${message.guild.roles.cache.size - 1}`
            },
          ].map((element) => Object.assign(element, { inline: true })))
          .setFooter(`There are currently ${role.members.size} member${role.members.size === 1 ? '' : 's'} with this role. ${users.size ? `${users.size} User${users.size === 1 ? '' : 's'}` : ''}${users.size && bots.size ? ' / ' : ''}${bots.size ? `${bots.size} Bot${bots.size === 1 ? '' : 's'}` : ''}`)
        )
      })
      .catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}