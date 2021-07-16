const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes')
const app = express();
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 3000;
const exphbs = require("express-handlebars");
const db = mongoose.connection;
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

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


app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

app.use(routes)



app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`);
});
