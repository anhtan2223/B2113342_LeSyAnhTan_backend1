module.exports = {
    app :  {
        PORT : process.env.PORT || 3000 ,
        MongoURL : "mongodb://127.0.0.1:27017",
        DBName : "ContactBook" ,
        CollectionName : "ContactList"
    }
}