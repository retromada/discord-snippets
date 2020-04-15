const util = require('util')

module.exports = {
  name: 'eval',
  aliases: ['e', 'exec', 'execute'],
  description: 'Evaluates javascript code',
  category: 'developers',
  requirements: { devOnly: true },
  async execute(message) {
    try {
      const evaled = await eval(message.parameters.join(' ').replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
      const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
      await message.channel.send(cleanEvaled, { code: 'js' })
    } catch (error) {
      message.channel.send(this.clean(error), { code: 'js' })
    }
  },

  clean(text) {
    const blankSpace = String.fromCharCode(8203)
    return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
  }
}