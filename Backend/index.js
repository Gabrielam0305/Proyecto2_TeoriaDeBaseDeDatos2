const express = require('express')
const bodyParser = require('body-parser')
var urlencodeparser = bodyParser.urlencoded({extended:true})
const app = express()
app.use(urlencodeparser)
let port= 3000;
app.listen(port,()=>{
    console.log("corriendo en ", port)
})