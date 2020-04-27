const mongoose = require('mongoose')
const { UserRepository } = require('./repositories')

module.exports = {
  connect(client) {
    return mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      client.database.users = UserRepository
    })
  }
}