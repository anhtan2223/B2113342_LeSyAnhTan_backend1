var express = require("express")
var control = require("../controllers/contact.controller")

const router = express.Router()

//api/contact
router.route("/")
    .get(control.findAll)
    .post(control.create)
    .delete(control.deleteAll)

router.route("/favorite")
    .get(control.findAllFavorite)

router.route("/:id")
    .get(control.findOne)
    .put(control.update)
    .delete(control.delete)

module.exports = router ;


/*
Step by Step : 
    Connect to DB -> get Client / DBName / Collection
    Handdler in DB -> Use Controller 

Data Type : 
{
    Name : "String",
    Email : "String",
    Adress : "String",
    Phone : "String" ,
    Favorite : "True/False" :Default : False 
}
*/
