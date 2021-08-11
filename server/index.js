const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
app.get('/test', (req, res) => {
    res.send('Hello World!')
  })
app.get('/', (req, res, next) =>{
    res.redirect('/public')
})
app.use('/public' , express.static(path.resolve(__dirname, '../docs')))

app.listen(port, ()=>{
    console.log(`Server started! Access to http://localhost:${port}`)
})
