const { MessageEmbed } = require('discord.js')

module.exports = (client, member) => {
  member.guild.channels.cache.get(client.notifyChannels.joinAndLeave).send(new MessageEmbed()
    .setColor([255, 0, 0])
    .setDescription(`${member} left the server. (${member.id})`)
    .setFooter(`User Leave (${member.guild.memberCount})`, member.user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setTimestamp()
  )
}