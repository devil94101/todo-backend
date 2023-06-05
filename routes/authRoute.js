var express = require('express');
const { createError } = require('../helpers/common');
const { createJWT, createRefreshJWT } = require('../helpers/jwtHelper');
var router = express.Router();
let userData = require('../utils/sampleUserData')

router.post('/login', async (req, res, next) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return next(createError("All feilds are required!"))
        }

        let findUser = userData.findIndex(ele => {
            if (ele.email === email && ele.password == password) {
                return true
            }
            return false
        })

        if(findUser === -1){
            return next(createError("Invalid email or password!"))
        }

        let userId= userData[findUser].id
        let name = userData[findUser].name

        let token = await createJWT({
            email,
            id: userId,
            name
        })
        // let refreshToken = await createRefreshJWT({
        //     email,
        //     id: userId
        // }, '30d')

        // res.cookie(`refreshToken`,refreshToken,{
        //     maxAge: 5000,
        //     // expires works the same as the maxAge
        //     secure: true,
        //     httpOnly: true,
        //     sameSite: 'lax'
        // });
        return res.send({
            msg: "Login Successfully!",
            data:{
                token,
                email,
                id:userId,
                name
            },
        })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
})



module.exports = router