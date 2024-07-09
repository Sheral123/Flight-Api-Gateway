const CrudRepo = require('./crud-repo');

const {Role} = require('../models')

class roleRepo extends CrudRepo{
    constructor() {
        super(Role);
    }

    async getRoleName(name){
        const role = await Role.findOne({where: {name: name}});
        return role;
    }
}

module.exports = roleRepo;