const express = require('express');
const ejs = require('ejs');
const db = require('./database/db');
const blogRouter = require('./routers/blogrouter');

const app = express();

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(blogRouter)

db.connectToMongodb().then(() => {
    app.listen(3000)
})


