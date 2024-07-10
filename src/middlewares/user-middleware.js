const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utills/common');
const AppError = require('../utills/errors/app-error');
const{UserService} = require('../services');

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

async function checkAuth(req, res, next){
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response){
            req.user = response;
            next();
        }
<<<<<<< HEAD
    } catch (error) {
=======
    } catch (error) {  
>>>>>>> c3a12e3 (g)
        return res
                .status(error.statusCode)
                .json(error);
        
    }
}

<<<<<<< HEAD
=======
async function isAdmin(req, res, next){
    
    const response = await UserService.isAdmin(req.user);
    console.log(response);
    if(!response){
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: 'user not authorised for this action'});
    }
    next(); 
}




>>>>>>> c3a12e3 (g)


module.exports = {
    validateAuthRequest,
<<<<<<< HEAD
    checkAuth
=======
    checkAuth,
    isAdmin
>>>>>>> c3a12e3 (g)
}