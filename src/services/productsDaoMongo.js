import ContenedorMongoDb from "../server/db.js"
import productSchema from "../models/productSchema.js"

class ProductsDaoMongo extends ContenedorMongoDb {

    constructor() {
        super('products', productSchema)
    }
}

export default ProductsDaoMongo