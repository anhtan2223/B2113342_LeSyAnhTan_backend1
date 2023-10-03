const { ObjectId } = require("mongodb")
const { options } = require("../routes/contact.routes")

module.exports = class Service 
{
    constructor(collection)
    {
        this.collection = collection
    }

    extractData(body) //Convert body -> Document
    {
        var document = {
            name : body.name ,
            email : body.email ,
            address : body.address ,
            phone : body.phone ,
            favorite : body.favorite 
        }
        //Remove Field Undefined
        for(var i in document)
            if(document[i] === undefined )
                delete document[i]
        return document
    }

    async create(document)
    {
        const result = await this.collection.findOneAndUpdate(
            document ,
            { $set : {favorite : document.favorite === true} }, //update
            {upsert : true}) //Update or Create
    }
    async find(filter)
    {
        return await this.collection.find(filter).toArray()
    }
    async findByName(NAME)
    {
        return await this.collection.find({
            name : {$regex : new RegExp(NAME), $options:'i'}}).toArray()
    }
    async findByID(id)
    {
        const ObjID = ObjectId.isValid(id) ? new ObjectId(id) : null
        if(ObjID === null) return null
        //Convert id to ObjectID cua Mongo           
        return await this.collection.find({_id : ObjID}).toArray()
        //Tìm kiếm các object có filter theo _id 
    }
    async update(id,update)
    {
        const ObjID = ObjectId.isValid(id) ? new ObjectId(id)
                                             : null
        
        const result = await this.collection.findOneAndUpdate(
                {_id : ObjID},
                {$set : this.extractData(update)},
                {returnDocument : "after"})

        return result //Return NULL if ID not Exist
    }
    async delete(id)
    {
        const ObjID = ObjectId.isValid(id) //Check ID
                        ? new ObjectId(id): null
        return await this.collection.deleteOne({_id : ObjID})
    }
    async deleteAll()
    {
        return await this.collection.deleteMany({}) //filter == null -> ALL
    }
}   