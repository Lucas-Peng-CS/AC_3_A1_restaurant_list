const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant') // 載入 Restaurant model
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = [{
  name: '皮卡丘',
  email: 'user1@example.com',
  password: '12345678',
  idNumbers: [1, 2, 3]
},
{
  name: '卡比獸',
  email: 'user2@example.com',
  password: '12345678',
  idNumbers: [4, 5, 6]
}]

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const lists = []
          seedUser.idNumbers.forEach(idNumber => {
            const list = restaurantList.find(restaurant => restaurant.id === idNumber)
            list.userId = user._id
            lists.push(list)
          })
          return Restaurant.create(lists)
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
