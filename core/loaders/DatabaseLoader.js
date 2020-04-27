const { Mongo } = require('../database')

module.exports = {
  load(client) {
    this.initializeDatabase(client)
  },

  initializeDatabase(client) {
    client.database = Mongo
    client.database.connect(client)
      .then(() => client.log('Database connection established'))
      .catch((error) => {
        client.log('Database', error.message)
        client.database = null
      })
  }
}