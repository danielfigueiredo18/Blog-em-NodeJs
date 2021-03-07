const express = require("express")
const router = express.Router()
var path = require( 'path' );

router.get("/assets/js/style.js",(req,res)=>
    res.sendFile(path.resolve("./assets/js/style.js"))
)

router.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
  })
  
  router.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params
    res.end(`Item: ${slug}`)
  })

module.exports = router;