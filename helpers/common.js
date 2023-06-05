const createError = (msg, status) =>{
    let error = new Error(msg)
    error.status = status
    return error
}

module.exports = { 
    createError
}