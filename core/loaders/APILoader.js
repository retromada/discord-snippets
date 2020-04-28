const { FileUtils } = require('../')

module.exports = {
  load(client) {
    this.initializeAPIs(client)
  },

  initializeAPIs(client, directory = 'core/apis') {
    client.apis = {}

    return FileUtils.requireDirectory(directory, (api, name) => {
      if (api.load) client.apis[name.toLowerCase()] = api.load()
    }, console.error)
  }
}