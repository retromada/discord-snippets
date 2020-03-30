const { MessageEmbed } = require('discord.js')

module.exports = (client, member) => {
  member.guild.channels.cache.get(client.notifyChannels.joinAndLeave).send(new MessageEmbed()
    .setColor([0, 255, 0])
    .setDescription(`${member} joined the server. (${member.id})`)
    .setFooter(`User Join (${member.guild.memberCount})`, member.user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setTimestamp()
  )
}