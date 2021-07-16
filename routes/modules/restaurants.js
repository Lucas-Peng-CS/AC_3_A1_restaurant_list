const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/search", (req, res) => {
  //剔除多餘的空白
  const keyword = req.query.keyword.trim();
  //「搜尋資料為空」的例外處理
  const rightKeyword = keyword === "" ? "為空白" : keyword;
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const restaurantSearch = restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(rightKeyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(rightKeyword.toLowerCase())
        );
      });
      restaurantSearch.length === 0
        ? res.render("notShow", { rightKeyword })
        : res.render("index", { restaurants: restaurantSearch, rightKeyword });
    })
    .catch((error) => console.error(error));
});

// 建立新的餐廳頁面
router.get("/new", (req, res) => {
  return res.render("new");
});
// 建立新的餐廳到資料庫
router.post("/", (req, res) => {
  const datas = req.body; // 從 req.body 拿出表單裡的資料
  return Restaurant.create(datas) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

//瀏覽特定餐廳
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((error) => console.log(error));
});

//修改特定餐廳頁面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

//修改特定餐廳資料到資料庫
router.put("/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body);
      return restaurant.save();
    })

    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// 刪除特定餐廳
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router


