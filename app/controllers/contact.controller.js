const MongDB = require("../util/mongo.util")
const Service = require("../services/contact.service")
const ERROR = require("../api-error")
const { ObjectId } = require("mongodb")

module.exports.create = async (req,res,next) => {
    try {
        const service = new Service(MongDB.collection)
        // console.log(service.extractData(req.body))

        const document = service.extractData(req.body)
        const result = service.create(document)
        res.send({message : "Create Handle"})
    } catch (error) {
        return next(new ERROR(500,"Have Something Error When Create New Contact"))
    }
}

module.exports.findAll = async (req,res,next) => {
    var document = []
    try {
        const {name} = req.query
        const service = new Service(MongDB.collection)

        if (name === undefined)
                document = await service.find({})
        else    document = await service.findByName(name) 
        res.send(document)
    } catch (error) {
        return next(new ERROR(500,"Error When Find",error))
    }
    // res.send({message : "findAll Handle"})
}
module.exports.findOne = async (req,res,next) => {
    var document = []
    try {
        const service = new Service(MongDB.collection)
        document = await service.findByID(req.params.id)

        if(Object.keys(document).length === 0 ) //Not found  
            return next(new ERROR(404,"ID is not Found"))

        res.send(document)
    } catch (error) {
        return next(new ERROR(500,"Have Error When Find By Id"))
    }
}
module.exports.update = async (req,res,next) => {
    if(Object.keys(req.body).length === 0) 
        return next(new ERROR(400,"Body Not Have To Update"))
    try {
        const service = new Service(MongDB.collection)
        const result = await service.update(req.params.id,req.body)
        if(!result) //Catch Null Value
            return next(new ERROR(404,"Not Found ID to Update"))
        res.send(result)
    } catch (error) {
        return next(new ERROR(500,`Has Error When Updata ID : ${req.params}`))
    }
}
module.exports.delete = async (req,res,next) => {
    try {
        const service = new Service(MongDB.collection)
        const result = await service.delete(req.params.id)
        if(result.deletedCount === 0)
            return next(new ERROR(404,"ID not Found - 0 Object Deleted"))
        res.send({message : `Delete successfully ID : ${req.params.id} `})
    } catch (error) {
        return next(new ERROR(500,`Has Error When Delete ID : ${req.params.id}`))
    }
}
module.exports.deleteAll = async (req,res,next) => {
    try {
        const service = new Service(MongDB.collection)
        await service.deleteAll(req.params.id)
        res.send({message : `Delete ALL successfully `})
    } catch (error) {
        return next(new ERROR(500,`Has Error When Delete All`))
    }
}
module.exports.findAllFavorite = async (req,res,next) => {
    var result = []
    try {
        const service = new Service(MongDB.collection)
        result = await service.find({favorite : true})
        res.send(result)
    } catch (error) {
        console.log(error)
        return next(new ERROR(500,"Error When FindAll Favorite"))
    }
    res.send({message : "findAllFavorite Handle"})
}