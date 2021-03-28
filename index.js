const connection = require("./database/database")
const express = require("express")
const bodyParser = require("body-parser")
const cCategories = require("./controllers/Categories")
const cArticles = require("./controllers/Articles")

const Article = require("./models/Article")
const Category = require("./models/Category")

const app = express()
// View Engine
app.set('view engine', 'ejs')
// Static
app.use(express.static('assets'))
// Body-Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Router Categories
app.use("/", cCategories)
// Router Articles
app.use("/", cArticles)

app.get("/",(req,res)=>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles =>{
        Category.findAll().then(categories=>{
           res.render("index",{articles: articles, categories: categories}) 
        })     
    })
})

app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("article",{article: article, categories: categories})
             }) 
            
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },include:[{model: Article}]
    }).then(category=>{
        if(category!= undefined){
            Category.findAll().then(categories=>{
                res.render("index", {articles: category.articles, categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

//DataBase
connection.authenticate().then(()=>{
    console.log("Connected")
    app.listen(8080,()=>{
        console.log("Server Started!!")
    })
}).catch((error)=>{
    console.log(error)
})

