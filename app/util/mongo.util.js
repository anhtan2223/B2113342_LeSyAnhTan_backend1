var { MongoClient } = require("mongodb")
var config = require("../config/index.js")

module.exports = class 
{
    static async connect(URL)
    {
        // console.log(this.client)
        if(this.collection === undefined)   //Chua goi den bao gio
        { 
            const client = new MongoClient(URL)
            console.log("Connected To Database")
            await client.connect() //Connected to database
            this.collection = client.db(config.app.DBName).collection(config.app.CollectionName)
        }
            return this.collection
    }
}