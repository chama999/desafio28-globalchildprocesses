import ContenedorMongoDb from "../server/db.js"
import registerSchemaMongoose from "../models/userSchema.js"

class UsersDaoMongo extends ContenedorMongoDb {

    constructor() {
        super('users', registerSchemaMongoose)
    }
}

export default UsersDaoMongo