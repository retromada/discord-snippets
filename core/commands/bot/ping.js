module.exports = {
  name: 'ping',
  aliases: ['latency'],
  description: 'Latency time',
  category: 'bot',
  async execute(message) {
    const _message = await message.channel.send('*Pinging...*')
    const messageLatency = _message.createdTimestamp - message.createdTimestamp

    _message.edit(`:ping_pong: ${messageLatency} :heartpulse: ${~~message.client.ws.ping}`)
  }
}