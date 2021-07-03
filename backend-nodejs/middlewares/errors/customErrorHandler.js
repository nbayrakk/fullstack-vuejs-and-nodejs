const CustomError = require('../../helpers/error/CustomError')

const customErrorHandler = (err, req, res, next) => {
    let customError = err
    console.log(err)

    if(err.name==="SyntaxError"){
        customError = new CustomError("Unexpected Syntax",400)
    }
    // if(err.status==401){
    //     customError = new CustomError("Please check your inputs!",401)
    // }
    if(err.name==="ValidationError"){
        customError = new CustomError(err.message,400)
    }
    res
        .status(customError.status || 500 || 401)
        .json({
            success:false,
            message: customError.message
        })
};

module.exports = customErrorHandler