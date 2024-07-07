const CrudRepo = require('./crud-repo');

const {User} = require('../models')

class userRepo extends CrudRepo{
    constructor() {
        super(User);
    }
}

module.exports = userRepo;