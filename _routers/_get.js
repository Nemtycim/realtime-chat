const express = require('express');
const router = express.Router();
const _Users = require('../_schemas/User.Schema')

router.get('/', (req, res, next) => { 
   
   return res.render('index.ejs') 

});

router.get('/index', (req, res, next) => { 
   return res.render('index.ejs')

});

router.get('/register', (req, res, next) => {

    return res.render('register.ejs') });


router.get('/login', (req, res, next) => { 
   return res.render('login.ejs') 

});


router.get('/chat', async (req, res, next) => { 
   
     const users = await _Users.find({});
     let isim = req.session.username
     const singleUser = await _Users.findOne({ userName: isim });
     console.log(isim)
    return res.render('chat.ejs', { users, kullanici: singleUser.userNickName  });
})

module.exports = router