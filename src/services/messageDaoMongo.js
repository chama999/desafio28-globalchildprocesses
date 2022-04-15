import ContenedorMongoDb from "../server/db.js"
import messageSchema from "../models/messageSchema.js"

class MessagesDaoMongo extends ContenedorMongoDb {

    constructor() {
        super('messages', messageSchema.messageSchemaMongoose)
    }
}

export default MessagesDaoMongo