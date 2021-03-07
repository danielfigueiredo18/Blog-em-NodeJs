const express = require("express")
const router = express.Router()
var path = require( 'path' );

router.get("/assets/js/style.js",(req,res)=>
    res.sendFile(path.resolve("./assets/js/style.js"))
)

module.exports = router;