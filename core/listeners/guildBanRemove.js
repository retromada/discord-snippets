const { MessageEmbed } = require('discord.js')

module.exports = (client, guild, user) => {
  guild.channels.cache.get(client.notifyChannels.banAndUnban).send(new MessageEmbed()
    .setColor([254, 255, 255]) // 254 is purposeful!
    .setDescription(`${user} was unbanned. (${user.id})`)
    .setFooter(`User Unbanned`, user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setTimestamp()
  )
}