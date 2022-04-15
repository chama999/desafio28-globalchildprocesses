//schema product json
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: false
    },
    image: {
        type: String
    },
    createdDate: {
        type: String
    },
    updatedDate: {
        type: String
    }
});

export default productSchema;
