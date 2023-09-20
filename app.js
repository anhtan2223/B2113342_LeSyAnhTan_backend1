var express = require("express")
var cors = require("cors")

var app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({Message : "Welcome to Contactbook Aplication"})
})

var route = require("./app/routes/contact.routes.js")

app.use("/api/contact",route);

module.exports = app