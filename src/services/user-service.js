const {userRepo} = require('../repositories');
const AppError = require('../utills/errors/app-error');
const UserRepo = new userRepo();
const {StatusCodes} = require('http-status-codes');

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
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    create
}