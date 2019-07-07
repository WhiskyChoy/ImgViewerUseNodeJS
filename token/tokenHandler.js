let jwt = require('jsonwebtoken');

class TokenHandler {
    constructor() {
        this.secret = 'my_secret';
        this.jwt = jwt;
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    sign(input) {
        return this.jwt.sign(input, this.secret);
    }
}

module.exports = TokenHandler;