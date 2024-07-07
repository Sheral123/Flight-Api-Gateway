const CrudRepo = require('./crud-repo');

const {User} = require('../models')

class userRepo extends CrudRepo{
    constructor() {
        super(User);
    }

    async getUserEmail(email){
        const user = await User.findOne({where: {email: email}});
        return user;
    }
}

module.exports = userRepo;