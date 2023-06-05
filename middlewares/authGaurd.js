const { verifyJwt } = require("../helpers/jwtHelper");

const authGaurd = async (req,res,next)=>{
    let token = req.headers['token'];
    // console.log(req.headers)
    let error ;
    if(!token){
        error = new Error('No token found!')
        error.status = 400
        return next(error)
    }
    try{
        let userDetails = await verifyJwt(token)
        if(userDetails.id){
            req.headers.userId = userDetails.id
            return next()
        }
        error = new Error('Invalid Token')
        error.status = 403
        return next(error)
    }catch(err){
        console.log(err.message)
        error = new Error('Invalid token')
        error.status = 403
        return next(error)
    }

}

module.exports = {
    authGaurd
}