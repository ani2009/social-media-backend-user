var jwt = require('jsonwebtoken');

function genrateJWT(userEmail){
    const token = jwt.sign(
        { user_email: userEmail },
        process.env.TOKEN_KEY,
        { expiresIn: "2h"}
    )
    return token
}

function authenticateUser(req, res, next){
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        const decodeJWT = jwt.verify(token, process.env.TOKEN_KEY)
      
    }catch(err){
        return res.status(401).send("Invalid Token");
    }   
    next()
}

function getJWT(reqHeader){
    const token = reqHeader["x-access-token"]
    const decodeJWT = jwt.verify(token, process.env.TOKEN_KEY)
    return(decodeJWT)
}

module.exports = {genrateJWT, authenticateUser, getJWT}