const Restaurant = require('../restaurant') // 載入 Restaurant model
const restaurantList = require('./restaurant.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      db.close()
      console.log('done')
    })
})
