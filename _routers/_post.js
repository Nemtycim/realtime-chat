const express = require('express');
const router = express.Router();
const moment = require('moment')
require('moment-duration-format')
moment.locale("tr")

const _User = require('../_schemas/User.Schema')
const codes = require('../_utils/other.codes')


router.post('/register', async(req, res) => {
     let _nickName = req.body.usernickname;
     let _username = req.body.username;
     let _userpass = req.body.password;
     let _userMail = req.body.email;

     const existingUser = await _User.findOne({ $or: [ { userName: _username }, { userMail: _userMail } ] });

    if (existingUser) { return res.status(400).send('Bu kullanıcı adı veya e-posta zaten kayıtlı.'); }

     const _data = new _User({  unique_id: codes.generateRandomNumber(),  userNickName: _nickName, userName: _username, userPass: _userpass, userMail: _userMail,  userCreatedAt: moment().format('LLLL') })
     await _data.save()
     res.redirect('/index')
 });

router.post('/login', async(req, res) => { 
    let _username = req.body.username;
    let _password = req.body.password
    req.session.username = _username;
    let _data = await _User.findOne({userName: _username})

    if(_data && _password == _data.userPass) {
        res.redirect('/chat')
    }
    else {
        res.redirect('/index')
    }
})

module.exports = router