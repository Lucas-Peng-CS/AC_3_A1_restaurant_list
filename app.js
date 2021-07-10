const express = require("express");
const mongoose = require("mongoose");
const restaurantList = require("./restaurant.json");
const app = express();
mongoose.connect("mongodb://localhost/restaurant_list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 3000;
const exphbs = require("express-handlebars");
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// 設定樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/search", (req, res) => {
  //剔除多餘的空白
  const keyword = req.query.keyword.trim();
  const rightKeyword = keyword === "" ? "為空白" : keyword;

  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(rightKeyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(rightKeyword.toLowerCase())
    );
  });

  restaurants.length === 0
    ? res.render("notShow", { rightKeyword })
    : res.render("index", { restaurants, rightKeyword });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant });
});

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`);
});
