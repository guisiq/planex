var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic("C:\\Users\\lopes\\OneDrive\\estudos\\facudade\\proj.pesquisa\\planex\\dist"))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)