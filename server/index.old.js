const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.get("/test", (req, res) => {
  let a = Date.now() / 1000;
  let seconds = Math.floor(a);
  res.send("Hello World!" + seconds);
});
app.get("/test2", (req, res) => {
  let now = new Date();
  let nowText =
    now.getFullYear() +
    "年" +
    (now.getMonth() + 1) +
    "月" +
    now.getDate() +
    "日" +
    now.getHours() +
    "時" +
    now.getMinutes() +
    "分" +
    now.getSeconds() +
    "秒";
  console.log("time");
  res.send("Ok" + nowText);
});
// app.get('/', (req, res, next) =>{
//     res.redirect('/public')
// })
app.use("/", express.static(path.resolve(__dirname, "../docs")));

app.listen(port, () => {
  console.log(`Server started! Access to http://localhost:${port}`);
});
