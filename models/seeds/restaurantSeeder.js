const mongoose = require("mongoose");
const Restaurant = require("../restaurant"); // 載入 Restaurant model
const restaurantList = require("./restaurant.json");
mongoose.connect("mongodb://localhost/restaurant_list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  Restaurant.create(restaurantList);
  console.log('done')
});
