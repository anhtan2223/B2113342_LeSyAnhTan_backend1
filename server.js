var app = require("./app.js")
var config = require("./app/config/index.js")
var MongoDB = require("./app/util/mongo.util")

const port = config.app.PORT ;

async function StartServer()
{
    try {
        await MongoDB.connect(config.app.MongoURL)
        const collection = await MongoDB.connect(config.app.MongoURL)

        // var result = collection.insertOne({name:"Tommy",age:"25"})
        app.listen(port,()=>{console.log("Listen Server on Port 3000")})

    } catch (error) {
        console.log("Connect to MongoDB Has problem")
        console.log(error)
    }
}

StartServer()