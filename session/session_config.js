let config = {
    secret: 'my_secret',
    name: 'web_homework',
    cookie: {maxAge: 10 * 60 * 1000},
    resave: true,
    saveUninitialized: false
};

module.exports = config;