let userSql = {
    checkExist: 'select * from user where username = ? ',
    addUser:'insert into user(username,password) VALUES(?,?)',
};

module.exports = userSql;