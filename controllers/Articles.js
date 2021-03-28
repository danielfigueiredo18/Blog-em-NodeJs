const express = require("express")
const router = express.Router()
const Category = require("../models/Category")
const Article = require("../models/Article")
const slugify = require("slugify")

router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
       res.render("../views/admin/articles/index",{articles: articles}) 
    })
    
})

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
       res.render("../views/admin/articles/new",{categories: categories}) 
    })
    
})

router.get("/admin/articles/edit/:id",(req,res)=>{
    var id = req.params.id;
    Article.findOne({
        where:{
            id: id
        },include: {model: Category}
    }).then(article =>{
        Category.findAll().then(categories=>{
            res.render("../views/admin/articles/edit",{article: article,categories: categories}) 
        })
       
    })
    
})

router.get("/articles/page/:num",(req,res)=>{
    var page = req.params.num
    var offset = 0

    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = (parseInt(page)-1) * 4
    }
  
    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles=>{
        var next;
        if(offset + 4 >= articles.count){
            next = false
        }else{
            next = true
        }
        var result = {
            next: next,
            articles: articles
        }
        Category.findAll().then(categories=>{
            res.render("admin/articles/page",{result: result, categories: categories})
        })
        
    })
})

router.post("/articles/save",(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    if(title != undefined && body != undefined){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(()=>{
            res.redirect("/admin/articles")
        })
    }else{
        res.redirect("/admin/articles/new")
    }
})

router.post("/articles/delete", (req,res) =>{
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles")
            })
        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }
})

router.post("/articles/update", (req,res) =>{
    var id = req.body.id
    var title = req.body.title
    var category = req.body.category;
    var body = req.body.body
    if(id != undefined && title != undefined){
            Article.update(
                {
                    title: title,
                    slug: slugify(title),
                    body: body,
                    categoryId: category 
                },{
                    where: {id: id}
                }
            ).then(()=>{
                res.redirect("/admin/articles")
            })
    }else{
        res.redirect("/admin/articles")
    }
})

module.exports = router;