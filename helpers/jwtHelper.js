
let JWT = require('jsonwebtoken');

const createJWT = async (payload,exp = '10s') => {
    let token = await JWT.sign(payload,process.env.JWT_SECRET,{ expiresIn: exp })
    return token;
} 

const createRefreshJWT = async (payload ) => {
    let token = await JWT.sign(payload,process.env.JWT_REFRESH_SECRET,{ expiresIn: process.env.JWT_REFRESH_SECRET_EXP_DAY+'d' })
    return token;
} 

const verifyJwt = async (token) =>{
    try{
        let x = await JWT.verify(token,process.env.JWT_SECRET)
        return x
    }catch(err){
        console.log(err.message)
        throw err
    }
}

const verifyRefreshJwt = async (token) =>{
    try{
        let x = await JWT.verify(token,process.env.JWT_REFRESH_SECRET)
        return x
    }catch(err){
        console.log(err.message)
        throw err
    }
}

module.exports = {
    createJWT,
    verifyJwt,
    createRefreshJWT,
    verifyRefreshJwt,
}