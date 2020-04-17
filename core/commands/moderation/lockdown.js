module.exports = {
  name: 'lockdown',
  aliases: ['lockchannel'],
  description: 'Toggles between allowing or blocking messages sends on the channel',
  usage: '[on|off]',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['MANAGE_ROLES'] },
  async execute(message) {
    const [breaker] = message.parameters

    if (!['ON', 'OFF'].includes(breaker.toUpperCase())) return

    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        ...{
          on: {
            deny: ['SEND_MESSAGES']
          },
          off: {
            allow: ['SEND_MESSAGES']
          }
        }[breaker.toLowerCase()]
      }
    ])
  }
}