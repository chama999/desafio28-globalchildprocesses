//schema message json mongoose
import mongoose from 'mongoose';
const SchemaMongoose = mongoose.Schema;
const userSchemaMongoose = new SchemaMongoose({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const messageSchemaMongoose = new SchemaMongoose({
    user: { type: Object, required: true },
    message: { type: String, required: true },
    createdDate: { type: String},
    updatedDate: { type: String}
});

//schemas author y message normalizr
import normalizr from 'normalizr';
const { schema } = normalizr;
const userSchemaNormalizr = new schema.Entity('users', {}, { idAttribute: 'email' });
const messageSchemaNormalizr = new schema.Entity('messages', {user: userSchemaNormalizr})

let messageSchema = {
    userSchemaMongoose,
    messageSchemaMongoose,
    messageSchemaNormalizr,
    userSchemaNormalizr
}

export default messageSchema 

