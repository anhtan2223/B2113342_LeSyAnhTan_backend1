var express = require("express")
var cors = require("cors")
var route = require("./app/routes/contact.routes.js")

var app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({Message : "Welcome to Contactbook Aplication"})
})
app.use("/api/contact",route);

var API_Error = require("./app/api-error.js")
//Handle 404  Not Found 

app.use("/",(req,res,next) => {
    //Catch ALl route Not define 
    return next(new API_Error(404,"Resource Not Found"))
})
//Handle Error: 
app.use("/",function(err,req,res,next) {
    //Catch all route return API_Error 
    res.status(err.status || 500).json({
        message : err.message || "Internal Server Error"
    })

})



module.exports = app