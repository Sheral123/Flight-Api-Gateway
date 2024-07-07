const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const{ ServerConfig }  = require('../../config')


function checkPassword(planPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(planPassword,encryptedPassword);
    } catch (error) {
        throw error;    
    }

}

function createToken(input){
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});
        
    } catch (error) {
        throw error;
    }

}

module.exports = {
    checkPassword,
    createToken
}