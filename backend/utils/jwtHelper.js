var jwt = require('jsonwebtoken');
var SECRET= 'upc321';

function createJwt(userId) {
    var token = jwt.sign({ userId: userId}, SECRET);
    return token;
}

function verifyToken(token) {
    return new Promise((resolve,reject) => {
        var formattedToken = token.replace('Bearer ', '')
        jwt.verify(formattedToken, SECRET, (err,decoded) => {
            if(err) {
                reject({valid: false, error:err})
            } else {
                resolve({valid:true, userId: decoded.userId})
            }
        })
    })
    
}
module.exports= {
    createJwt,
    verifyToken
}
