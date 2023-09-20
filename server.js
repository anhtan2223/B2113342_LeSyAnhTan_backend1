var app = require("./app.js")
var config = require("./app/config/index.js")

const port = config.app.PORT ;

app.listen(port,()=>{
    console.log("Hello World") 
})