const express = require("express");
const router = express.Router();
const Restaurant = require('../../models/restaurant')
const sortValue = "Sort";

router.get("/", (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => res.render("index", { restaurants, sortValue })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); // 錯誤處理
});

module.exports = router
