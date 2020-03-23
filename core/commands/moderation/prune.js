module.exports = {
  name: 'prune',
  aliases: ['purge'],
  description: 'Deletes existing messages on the channel',
  usage: '[amount]',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['MANAGE_MESSAGES'] },
  async execute(message) {
    const [amount] = message.parameters

    if (isNaN(amount) || amount < 1 || amount > 100) return message.channel.send('Enter a value between 1 and 100.', { code: 'fix' })

    await message.delete()
    message.channel.bulkDelete(amount)
      .then((messages) => {
        message.channel.send(`:wastebasket: : **${message.author.username}**, ${messages.size} message${messages.size === 1 ? '' : 's'} deleted!`)
          .then((_message) => _message.delete({ timeout: 2555 }))
      })
      .catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}