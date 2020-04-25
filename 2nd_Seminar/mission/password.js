const fs = require('fs');
const crypto = require('crypto');

/**
 * password text file 만들기
 */
const title = 'password';
const data = 'qwerty';
fs.writeFileSync(`${title}.txt`, data);

var pwd = fs.readFileSync(`${title}.txt`);

const encrypt = (salt, password) => {
    return new Promise((resolved, rejected) => {
        crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            hashed = derivedKey.toString('hex');
            resolved(hashed);
        });
    })
}

const hashedTitle = 'hashed'
const salt = crypto.randomBytes(32).toString('hex');

encrypt(salt, pwd).then((result) => {
    fs.writeFileSync(`${hashedTitle}.txt`, result);
})
