const config = require('config');
const jwt = require('jsonwebtoken');

//middleware
function auth(req, res, next){
    const token = req.header('x-auth-token');

    //find token
    if(!token) return res.status(401).json({msg: 'No token passed'});
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg:"Token invalid"});
    }
}

module.exports = auth;