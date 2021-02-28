const connection = require("./database/database")
const express = require("express")
const bodyParser = require("body-parser")
const categories = require("./controllers/Categories")
const articles = require("./controllers/Articles")

const app = express()
// View Engine
app.set('view engine', 'ejs')
// Static
app.use(express.static('assets'))
// Body-Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Router Categories
app.use("/", categories)
// Router Articles
app.use("/", articles)

//DataBase
connection.authenticate().then(()=>{
    console.log("Connected")
    app.listen(8080,()=>{
        console.log("Server Started!!")
    })
}).catch((error)=>{
    console.log(error)
})

