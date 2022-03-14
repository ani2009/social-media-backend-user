const express = require("express");
const router= express.Router()
const app = express()
app.use(express.json())
require("dotenv").config();
const indexRouter= require('./src/Router/indexRouter')
const port = 3000


app.use('/', indexRouter)

app.listen((port), () => {
    console.log('Server is listening on port 3000.......!')
})
