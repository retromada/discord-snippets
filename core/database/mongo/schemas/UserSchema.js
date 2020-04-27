const { Schema, model } = require('mongoose')

module.exports = model('User', new Schema({
  _id: String,
  xp: Number
}))