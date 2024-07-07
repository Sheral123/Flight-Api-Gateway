const {userRepo} = require('../repositories');
const AppError = require('../utills/errors/app-error');
const UserRepo = new userRepo();
const {StatusCodes} = require('http-status-codes');
const {Auth}  = require('../utills/common')
const bcrypt = require('bcrypt');


async function create(data){

    try {
        const user = await UserRepo.create(data);
        return user;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user = await UserRepo.getUserEmail(data.email);
        if(!user){
            throw new AppError('no user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if(!passwordMatch){
            throw new AppError('invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.email});
       // console.log(jwt);
        return jwt; 
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}





module.exports = {
    create,
    signin
}