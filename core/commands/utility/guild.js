const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'guild',
  aliases: ['server', 'sv', 'guild-info', 'server-info'],
  description: 'Shows detailed information about the server',
  category: 'utility',
  execute(message) {
    message.guild.fetch(message.guild)
    .then((guild) => {
      message.channel.send(new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ format: 'png', dynamic: true, size: 64 }))
        .setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 256 }))
        .addFields([
          {
            name: 'Information',
            value: `Id: ${guild.id}\nAcronym: ${guild.nameAcronym}\n Created: ${guild.createdAt}\n Owner: ${guild.owner}\n Region: ${guild.region}`,
            inline: true
          },
          {
            name: 'Moderation',
            value: `AFK Timeout: ${guild.afkTimeout}\n MFA: ${guild.mfaLevel}\n Content Filter: ${guild.explicitContentFilter}\n Verification: ${guild.verificationLevel}`,
            inline: true
          },
          {
            name: 'Channels',
            value: `System: ${guild.systemChannel}\n Widget: ${guild.widgetChannel ? widget : 'None'}`,
            inline: false
          },
          {
            name: 'Counts',
            value: `Members: ${guild.members.cache.size}\n Channels: ${guild.channels.cache.size}\n  -[Category]: ${guild.channels.cache.filter(({ type }) => type === 'category').size}
            -[Text]: ${guild.channels.cache.filter(({ type }) => type === 'text').size}\n  -[Voice]: ${guild.channels.cache.filter(({ type }) => type === 'voice').size}
            Emojis: ${guild.emojis.cache.size}\n  -[Static]: ${guild.emojis.cache.filter(e => !e.animated).size}\n  -[Animated]: ${guild.emojis.cache.filter(e => e.animated).size}`,
            inline: true
          }
        ])
      )
    })
    .catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}