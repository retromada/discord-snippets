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
  async execute(message) {
    const guild = message.guild
    const channels = guild.channels.cache
    const emojis = guild.emojis.cache
    const roles = guild.roles.cache
    const invites = await guild.fetchInvites()
    const invite = guild.vanityURLCode ? guild.vanityURLCode : invites.array().sort((a, b) => a.memberCount - b.memberCount)[0].code

    message.channel.send(new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields([
        {
          name: 'Information',
          value: [
            `ID: ${guild.id}`,
            `Acronym: ${guild.nameAcronym}`,
            `Created: ${guild.createdAt}`,
            `Nitro Tier: ${guild.premiumTier}`,
            `Owner: ${guild.owner}`,
            `Region: ${guild.region}`,
            `Invite: [${invite}](https://discord.gg/${invite})`,
            `Shard: ${guild.shardID + 1}/${guild.shard.manager.shards.size}`
          ].join('\n')
        }, {
          name: 'Moderation',
          value: [
            `AFK Channel: ${guild.afkChannelID ? guild.afkChannel : 'None'}`,
            `AFK Timeout: ${guild.afkTimeout}`,
            `MFA: ${guild.mfaLevel}`,
            `Content Filter: ${guild.explicitContentFilter}`,
            `Verification: ${guild.verificationLevel}`
          ].join('\n')
        }, {
          name: 'Channels',
          value: [
            `System: ${guild.systemChannel}`,
            `Widget: ${guild.widgetEnabled ? guild.widgetChannel : 'None'}`
          ].join('\n'),
          inline: false
        }, {
          name: 'Counts',
          value: [
            `Members: ${guild.memberCount}`,
            `Channels: ${channels.size}`,
            `- [Category]: ${channels.filter(({ type }) => type === 'category').size}`,
            `- [Text]: ${channels.filter(({ type }) => type === 'text').size}`,
            `- [Voice]: ${channels.filter(({ type }) => type === 'voice').size}`,
            `Emojis: ${emojis.size}`,
            `- [Static]: ${emojis.filter(({ animated }) => !animated).size}`,
            `- [Animated]: ${emojis.filter(({ animated }) => animated).size}`
          ].join('\n')
        }, {
          name: '­',
          value: [
            `Boosts: ${guild.premiumSubscriptionCount ? guild.premiumSubscriptionCount : 0}`,
            `Roles: ${roles.size - 1}`,
            `- [Unmanaged]: ${roles.filter(({ editable }) => !editable).size}`,
            `- [Managed]: ${roles.filter(({ editable }) => editable).size - 1}`
          ].join('\n')
        }
      ].map((element) => element.inline !== false ? ({ ...element, inline: true }) : element))
    )
  }
}