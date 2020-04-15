const { MessageEmbed } = require('discord.js')

module.exports = (client, guild, user) => {
  guild.channels.cache.get(client.notifyChannels.banAndUnban).send(new MessageEmbed()
    .setColor([1, 0, 0]) // that's a valid black
    .setDescription(`${user} was banned. (${user.id})`)
    .setFooter(`User Banned`, user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setTimestamp()
  )
}