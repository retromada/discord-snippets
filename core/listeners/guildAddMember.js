module.exports = async (client, member) => {
  const memberExists = await client.database.users.findOne({ _id: member.id })
  if (memberExists) return

  client.database.users.add(member.id)
    .then(() => client.log(member))
    .catch((error) => client.log(error))
}