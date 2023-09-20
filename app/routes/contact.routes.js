var express = require("express")
var control = require("../controllers/contact.controller")

const router = express.Router()

router.route("/")
    .get(control.findAll)
    .post(control.create)
    .get(control.deleteAll)

router.route("/favorite")
    .get(control.findAllFavorite)

router.route("/:id")
    .get(control.findOne)
    .put(control.update)
    .delete(control.delete)

module.exports = router ;
