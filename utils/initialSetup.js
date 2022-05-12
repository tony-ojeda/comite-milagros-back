const Role = require('../api/role/role.model')

async function createRoles(){
    try{
        const count = await Role.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new Role({name: "admin"}).save(),
            new Role({name: "secretary"}).save(),
            new Role({name: "driver"}).save(),
        ]);

    } catch(error){
        console.error('Error: ',error)
    }
}

module.exports = createRoles
