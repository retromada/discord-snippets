const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'guild',
  aliases: [
    'ginfo',
    'guildinfo',
    'server',
    'sinfo',
    'serverinfo'
  ],
  description: 'Shows details about the server',
  category: 'utility',
  execute(message) {
    const guild = message.guild
    const channels = guild.channels.cache
    const emojis = guild.emojis.cache

    message.channel.send(new MessageEmbed()
      .setAuthor(guild.name, guild.iconURL({ format: 'png', dynamic: true, size: 64 }))
      .setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 256 }))
      .addFields([
        {
          name: 'Information',
          value: [
            `Id: ${guild.id}`,
            `Acronym: ${guild.nameAcronym}`,
            `Created: ${guild.createdAt}`,
            `Owner: ${guild.owner}`,
            `Region: ${guild.region}`
          ].join('\n')
        },
        {
          name: 'Moderation',
          value: [
            `AFK Timeout: ${guild.afkTimeout}`,
            `MFA: ${guild.mfaLevel}`,
            `Content Filter: ${guild.explicitContentFilter}`,
            `Verification: ${guild.verificationLevel}`
          ].join('\n')
        },
        {
          name: 'Channels',
          value: [
            `System: ${guild.systemChannel}`,
            `Widget: ${guild.widgetChannel ? guild.widgetChannel : 'None'}`
          ].join('\n'),
          inline: false
        },
        {
          name: 'Counts',
          value: [
            `Members: ${guild.members.cache.size}`,
            `Channels: ${channels.size}`,
            `- [Category]: ${channels.filter(({ type }) => type === 'category').size}`,
            `- [Text]: ${channels.filter(({ type }) => type === 'text').size}`,
            `- [Voice]: ${channels.filter(({ type }) => type === 'voice').size}`,
            `Emojis: ${emojis.size}`,
            `- [Static]: ${emojis.filter(({ animated }) => !animated).size}`,
            `- [Animated]: ${emojis.filter(({ animated }) => animated).size}`
          ].join('\n')
        }
      ].map((element) => element.inline !== false ? ({ ...element, inline: true }) : element))
    )
  }
}