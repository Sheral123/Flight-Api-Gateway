const {userRepo, roleRepo} = require('../repositories');
const AppError = require('../utills/errors/app-error');
const UserRepo = new userRepo();
const RoleRepo = new roleRepo();
const {StatusCodes} = require('http-status-codes');
const {Auth, Enums}  = require('../utills/common')
const bcrypt = require('bcrypt');


async function create(data){

    try {
        const user = await UserRepo.create(data);
        const role = await RoleRepo.getRoleName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
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

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await UserRepo.get(response.id);
        if(!user){
            throw new AppError('No user Found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT Token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('expired JWT Token', StatusCodes.BAD_REQUEST);
        }        
        throw new AppError('something wnet wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addRoletoUser(data){
    try {
        const user = await UserRepo.get(data.id);
        if(!user){
            throw new AppError('no user found for the given id', StatusCodes.NOT_FOUND);
        }
        const role = await RoleRepo.getRoleName(data.role);
        if(!role){
            throw new AppError('no user found for the given role', StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch (error) {
        if(error instanceof AppError)  throw error;
        throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function isAdmin(id)
{
    try {
        const user = await UserRepo.get(id);
        if(!user){
            throw new AppError('no user found for the given id', StatusCodes.NOT_FOUND);
        }
        const role = await RoleRepo.getRoleName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!role){
            throw new AppError('no user found for the given role', StatusCodes.NOT_FOUND);
        }
        return user.hasRole(role)

    } catch (error) {
        if(error instanceof AppError)  throw error;
        throw new AppError('something wnet wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }    
}


module.exports = {
    create,
    signin,
    isAuthenticated,
    addRoletoUser,
    isAdmin
}