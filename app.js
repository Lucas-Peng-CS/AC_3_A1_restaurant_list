const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const app = express();
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 3000;
const exphbs = require("express-handlebars");
const db = mongoose.connection;
const bodyParser = require("body-parser");

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
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); // 錯誤處理
});

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants", (req, res) => {
  const datas = req.body; // 從 req.body 拿出表單裡的資料
  return Restaurant.create(datas) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
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
