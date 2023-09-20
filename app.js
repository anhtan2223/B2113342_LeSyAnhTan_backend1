var express = require("express")
var cors = require("cors")

var app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({Message : "Welcome to Contactbook Aplication"})
})

module.exports = app