const { memData } = require('@constants/memberships')
const { getUserType } = require('@/utils/user')

const getAmount = (membership, email) => {
  const type = getUserType(email)
  const { price } = memData.find((mem) => mem.name === membership)
  return price.find((p) => p.type === type).price
}

module.exports = { getAmount }
