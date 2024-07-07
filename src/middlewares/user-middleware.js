const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utills/common');
const AppError = require('../utills/errors/app-error');

function validateAuthRequest(req,res,next) {
    if(!req.body.email){
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['Email found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.password){
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['password found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }    
    next();
}

module.exports = {
    validateAuthRequest
}