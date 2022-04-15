//schema message json mongoose
import mongoose from 'mongoose';
const SchemaMongoose = mongoose.Schema;
const registerSchemaMongoose = new SchemaMongoose({
    email: { type: String, required: true },
    name: { type: String, required: true},
    age: { type: Number, required: false },
    password: { type: String, required: true },
    createdDate: { type: String },
    updatedDate: { type: String }
});

export default registerSchemaMongoose;