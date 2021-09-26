require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const SQLManager = require('./scripts/SQLManager.js')

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/", express.static(path.resolve(__dirname, "../docs")));
app.post("/api/reservation", async (req,res,next)=>{
  let client = null
  try{
    client = await SQLManager.getClient()

    const insert = await client.query("INSERT INTO reservation (username,tell,reservation_date,reservation_time,menu) values($1,$2,$3,$4,$5)", [
      req.body.name,
      req.body.tell,
      req.body.date,
      req.body.time,
      JSON.stringify(req.body.menu),
    ])
    console.log(insert.rows)

    const result = await client.query("SELECT * FROM reservation")
    console.log(req.body)

    console.log(result.rows)

    res.status(200).json({
      // type: 'postDate',
      // message: '過去の日付が選択されているため、予約できませんでした。',
    })
  }catch(err){
    console.error(err)
    res.status(400).json({
      // type: 'postDate',
      // message: '過去の日付が選択されているため、予約できませんでした。',
    })
  }
  SQLManager.release(client)
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
