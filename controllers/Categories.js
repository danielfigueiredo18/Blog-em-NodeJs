const express = require("express")
const router = express.Router()
const Category = require("../models/Category")
const slugifly = require("slugify")

router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new")
})

router.post("/categories/save",(req,res)=>{
    var title = req.body.title
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugifly(title)
        }).then(res.redirect("/"))
    }else{
        res.redirect("/admin/categories/new")
    }
})

module.exports = router;