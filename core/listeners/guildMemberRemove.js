module.exports = (client, member) => {
  client.database.users.remove(member.id)
    .then(() => client.log(member))
    .catch((error) => client.log(error))
}