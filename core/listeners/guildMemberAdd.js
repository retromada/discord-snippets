module.exports = async (client, member) => {
  const memberExists = await client.database.users.findOne(member.id)
  if (memberExists) return

  client.database.users.add(member)
    .then(() => client.log(member.user))
    .catch((error) => client.log(error))
}