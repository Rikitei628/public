const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/", express.static(path.resolve(__dirname, "../docs")));
app.post("/api/reservation", (req,res,next)=>{
  console.log(req.body)
  res.json({
    // type: 'postDate',
    // message: '過去の日付が選択されているため、予約できませんでした。',
  })
})

app.get("/test",(req,res,next) => {
  res.render("index.ejs");
})
app.get("/test/menu",(req,res,next) => {
  res.render("menu.ejs");
})
app.get("/test/reserve",(req,res,next) => {
  res.render("reserve.ejs");
})
app.use((req,res,next) => {
  next(createError(404));
})
app.use((err,req,res,next) => {
  res.send(`エラーです。${err.message}`);
})
app.listen(port, () => {
  console.log(`Server started! Access to http://localhost:${port}`);
});
