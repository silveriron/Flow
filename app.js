const express = require('express');
const ejs = require('ejs');
const db = require('./database/db');
const blogRouter = require('./routers/blogrouter');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'bronse@silver&',
    resave: false,
    saveUninitialized: true,
}))

app.use(function(err, req, res, next) {
    res.status(500).render('500')
})

app.use(blogRouter)

app.use(function(req, res, next) {
    res.status(404).render('404')
})

db.connectToMongodb().then(() => {
    app.listen(3000)
})


