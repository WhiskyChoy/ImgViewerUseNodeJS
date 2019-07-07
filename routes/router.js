let express = require('express');
let DatabaseService = require('../database/wrapservice');
let router = express.Router();
let TokenHandler = require('../token/tokenHandler');

let databaseService = new DatabaseService();

router.use(async (req, res, next) => {
    let url = req.originalUrl;
    let arr = url.split('.');
    if (arr[arr.length - 1] !== 'html') {
        next();
    } else if (req.originalUrl !== '/login.html' && (!req.cookies || !req.cookies.username || (req.cookies.username && !await (new TokenHandler().verify(req.cookies.username))))) {
        res.redirect('/login.html');
    } else if (req.originalUrl === '/login.html' && (req.cookies && req.cookies.username && await (new TokenHandler().verify(req.cookies.username)))) {
        res.redirect('/index.html');
    } else {
        next();
    }
});


/* GET home page. */
router.post('/login', async function (req, res) {
    let data = req.body;
    let username = data.username;
    let password = data.password;
    let checked = data.checked;
    console.log(data);
    if (username && password) {
        try {
            let rows = await databaseService.checkUserExisted(username);
            if (rows && rows.length && rows.length > 0) {
                if (rows[0].password === password) {
                    let signedUsername = new TokenHandler().sign(username);
                    if (checked) {
                        res.cookie('username', signedUsername, {
                            maxAge: 3 * 24 * 60 * 60 * 1000,
                        });
                    } else {
                        res.cookie('username', signedUsername);
                    }
                    res.json({isValid: true});
                } else {
                    res.json({isValid: false, message: '密码错误'});
                }
            } else {
                res.json({isValid: false, message: '此用户不存在'});
            }
        } catch (err) {
            console.log(err);
            res.json({isValid: false, message: '数据库连接错误'});
        }
    } else {
        res.json({isValid: false, message: '输入不完整'});
    }
});

router.post('/register', async function (req, res) {
    let data = req.body;
    let username = data.username;
    let password = data.password;
    if (username && password) {
        try {
            await databaseService.addUser(username, password);
            res.json({isValid: true});
        } catch (err) {
            console.log(err);
            res.json({isValid: false, message: '注册新用户失败'});
        }
    } else {
        res.json({isValid: false, message: '输入不完整'});
    }
});


router.post('/logout', function (req, res) {
    res.clearCookie('username');
    res.json({isValid: true});
});


module.exports = router;
