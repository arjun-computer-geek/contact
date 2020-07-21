module.exports =(err, req, res, next) =>{

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })

    // if(process.env.NODE_ENV === 'development'){
    //     sendErrorDev(err, res)
    // } else if(process.env.NODE_ENV === 'production'){
    //     let error = {...err}
    //     if(error.name = 'CastError')
    //         error = handleCastErrorDB(error)
    //     if(error.code === 11000) 
    //         error = handleDuplicateFieldsDB(error)
    //     if(error.name === 'ValidationError')
    //         error = handleValidationErrorDB(error)
    //     if(error.name === 'jsonWebTokenError') 
    //         error = handleJWTError()
    //     if(error.name === 'TokenExpiredError')
    //         error = handleJWTExpiredError()

    //     sendErrorProd(error, res)
    // }
}