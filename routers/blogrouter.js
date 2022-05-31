const express = require('express');
const db = require('../database/db')

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