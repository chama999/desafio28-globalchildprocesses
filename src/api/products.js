import express from 'express'
import { webAuth } from './session-mongo.js';
import { fakerProducts } from '../server/utils.js';
import config from '../config/config.js';
import ProductsDaoMongo from '../services/productsDaoMongo.js';
import upload from '../server/multer.js';

const { Router } = express
const productsRouter = new Router()
const productsDb = new ProductsDaoMongo()

productsRouter.get('/products', (req, res) => {
    try {
        let products = []
        if (config.env.ENV==='test') {
            products = fakerProducts()
            res.render('./products', {list: products})
        }
        else {
            products=productsDb.listAll().then(products => {
            console.log("products:", products)
            res.render('./products', {list: products})
            })
        }
    }
    catch (err) {
        console.log("Error:", err)
    }
})

productsRouter.get('/newProduct', (req, res) => {
    res.render('./newProduct')
})

productsRouter.post('/api/productos', upload.single('file') , (req, res) => {
    let product = req.body
    product.image = req.file.filename
    console.log("Producto a añadir:", product)

    productsDb.save(product).then(() => {
        console.log("Producto a añadir:", product)
        res.send({status: '200', product: product})
    }).catch(err => {
        console.log("Error al añadir producto:", err)
        res.send({status: '404', err: err})
    })
})

export default productsRouter