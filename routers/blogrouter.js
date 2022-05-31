const express = require('express');
const db = require('../database/db')
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const session = require('express-session');

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

    if (!name || !password) {
        console.log('로그인정보 입력 안함')
        return res.redirect('/login')
    }

    const admin = await db.getDb().collection('admin').findOne({name: name})
    const isAuth = await bcrypt.compare(password, admin.password)

    if (!isAuth) {
        console.log('비밀번호 오류')
        return res.redirect('/login')
    }

    req.session.user = {
        name: name
    }
    req.session.isAuth = true

    res.redirect('/post')
})

router.get('/html', async (req, res) => {
    const posts = await db.getDb().collection('posts').findOne({title: 'ㄹㅇㄴㄹㄴㄷ'})
    res.send(posts.content)
//     res.render('html', {posts: posts})
})

router.get('/css', (req, res) => {
    res.render('css')
})

router.get('/javascript', (req, res) => {
    res.render('javascript')
})

router.get('/post', async (req, res) => {
    if (!req.session.isAuth) {
        console.log("접근권한 없음")
        return res.status(401).render('401')
    }

    const categories = await db.getDb().collection('category').find().toArray();
    res.render('post', {categories: categories})
})

router.post('/post', async (req, res) => {
    const data = req.body;
    const title = data.title;
    const content = data.content;
    const category = data.category

    await db.getDb().collection('posts').insertOne({
        title: title,
        content: content,
        date: Date(),
        category: category
    })

    res.redirect('/post')
})


module.exports = router