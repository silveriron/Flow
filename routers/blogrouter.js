const express = require('express');
const db = require('../database/db')
const bcrypt = require('bcrypt')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const data = req.body
    const name = data.name
    const password = data.password

    if (!name || password) {
        return res.redirect('/login')
    }

    const admin = await db.getDb().collection('admin').findOne({name: name})
    const isAuth = await bcrypt.compare(password, admin.password)

    if (!isAuth) {
        return res.redirect('/login')
    }

    req.session.user = {
        name: name
    }
    req.session.isAuth = true

    res.redirect('/')
})

router.get('/html', (req, res) => {
    res.render('html')
})

router.get('/css', (req, res) => {
    res.render('css')
})

router.get('/javascript', (req, res) => {
    res.render('javascript')
})



module.exports = router