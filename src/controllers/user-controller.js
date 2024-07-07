const {UserService }  = require('../services');

//const AppError = require('../utills/errors/app-error');
const{ErrorResponse, SuccessResponse} = require('../utills/common') 
const {StatusCodes } = require('http-status-codes');

//POST : /signup
// req-body {email: 'abc@.com', password: '1234'}

async function signup(req, res){
    try {
        const user = await UserService.create({
            email : req.body.email,
            password : req.body.password,
        });
        
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        //console.log('Sheral', error);
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}


async function signin(req, res){
    try {
        const user = await UserService.signin({
            email : req.body.email,
            password : req.body.password,
        });
       // console.log(user);
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}



module.exports= {
    signup,
    signin
}