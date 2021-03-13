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


//DataBase
connection.authenticate().then(()=>{
    console.log("Connected")
    app.listen(8080,()=>{
        console.log("Server Started!!")
    })
}).catch((error)=>{
    console.log(error)
})

