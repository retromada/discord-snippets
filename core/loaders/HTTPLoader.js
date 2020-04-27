const express = require('express')
const app = express()

module.exports = {
  load(client) {
    this.initializeHTTPServer(client)
  },

  initializeHTTPServer(client,  port = process.env.PORT) {
    app.get('/', (request, response) => response.sendStatus(200))
    app.listen(port)
  }
}