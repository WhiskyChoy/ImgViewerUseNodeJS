let db = require('./db_getter');
let usersql = require('./usersql');

class DatabaseService {
    checkUserExisted(username) {
        return new Promise((resolve, reject) => {

            db.query(usersql.checkExist, [username], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

    addUser(username, password) {

        return new Promise((resolve, reject) => {
            db.query(usersql.addUser, [username, password], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })

    }


}

module.exports = DatabaseService;