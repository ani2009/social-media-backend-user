var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { deprecate } = require('util');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex') + ':' + iv.toString('hex') + '=' + 
    key.toString('hex');
}

function decrypt(text) {
    let iv = Buffer.from((text.split(':')[1]).split('=')[0], 'hex')//will return iv;
    let enKey = Buffer.from(text.split('=')[1], 'hex')//will return key;
    let encryptedText = Buffer.from(text.split(':')[0], 'hex');//returns encrypted Data
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(enKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function genrateJWT(userEmail) {
    //encrypted{token:EncryptedToken}
    const token = jwt.sign(
        { user_email: encrypt(userEmail) },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    )
    return token
}

function authenticateUser(req, res, next) {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decodeJWT = jwt.verify(token, process.env.TOKEN_KEY)
    } catch (err) {
        console.log(err)
        return res.status(401).send("Invalid Token");
    }
    next()
}

function getJWT(reqHeader) {
    const token = reqHeader["x-access-token"]
    const decodeJWT = jwt.verify(token, process.env.TOKEN_KEY)
    const decrypted = decrypt(decodeJWT.user_email)

    return {user_email:decrypted}
}

module.exports = { genrateJWT, authenticateUser, getJWT }