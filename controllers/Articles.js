const express = require("express")
const router = express.Router()

router.get("/admin//articles",(req,res)=>{
    res.send("Artigos")
})

router.get("/admin/articles/new",(req,res)=>{
    res.render("../views/admin/articles/new.ejs")
})


module.exports = router;