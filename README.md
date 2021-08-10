# A1: 完成餐廳清單

此網頁程式可以讓使用者收藏喜愛的餐廳資訊

## 功能

- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以設定餐廳排序
- 使用者可以註冊帳號
- 使用者也可以透過 Facebook Login 直接登入
- 使用者登入後可以建立並管理專屬他的一個餐廳清單

### 環境

- Node.js v10.15.0
- mongodb v4.2.14
- bcryptjs ^2.4
- connect-flash ^0.1.1
- dotenv ^10.0.0
- express ^4.17.1
- express-handlebars ^5.3.2
- express-session ^1.17.2
- method-override ^3.0.0
- mongoose ^5.13.2
- passport ^0.4.1
- passport-facebook ^3.0.0
- passport-local ^1.0.0

### 安裝

1.開啟終端機(Terminal)將此專案 Clone 至本機電腦

`git clone https://github.com/Lucas-Peng-CS/AC_3_A1_restaurant_list.git`

2.進入存放此專案的資料夾

`cd AC_3_A1_restaurant_list`

3.安裝 npm 套件

`npm install`

4.加入種子資料

`npm run seed`

5.啟動網頁伺服器

`npm run dev`

6.當 Terminal 出現以下文字表示成功連結本地伺服器

`Express is listen on localhost:3000`

7.在任一瀏覽器中輸入 http://localhost:3000 開始瀏覽網頁

### 預設種子使用者

- 第一位使用者：
  1.email: user1@example.com
  2.password: 12345678 3.擁有 #1, #2, #3 號餐廳
- 第二位使用者：
  1.email: user2@example.com
  2.password: 12345678 3.擁有 #4, #5, #6 號餐廳

### 環境變數

環境變數在`.env.example` 檔案中，將檔案名稱改成`.env`後，請使用自己的憑證密碼。
FACEBOOK_ID
FACEBOOK_SECRE
