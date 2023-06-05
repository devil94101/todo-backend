let express = require("express")
const { createError } = require("./helpers/common")
let app = express()
let userRouter = require('./routes/userRoutes')
let authRouter = require('./routes/authRoute')
const cors = require('cors')

require("dotenv").config()

let PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/user' ,userRouter);
app.use('/auth' ,authRouter);

app.use((req,res,next)=>{
    next(createError("Route not found!",404))
})

app.use((err,req,res,next)=>{

    let status = err.status || 500
    return res.status(status).send({
        error: true,
        message: err.message
    })
})  

app.listen(PORT,()=>{
    console.log("Running on port ",PORT)
})