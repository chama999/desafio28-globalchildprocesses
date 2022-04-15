import express from 'express';
import productsRouter from '../api/products.js';
import mainRouter from '../api/main.js';
import sessionRouter from '../api/session-mongo.js';
import registerRouter from '../api/register.js';
import contactsRouter from '../api/contacts.js';
import path from 'path';
import {fileURLToPath} from 'url';
//desafio28 imports
import infoRouter from '../desafio28/infoRoute.js';
import randomRouter from '../desafio28/randomRoute.js';
//import { fork } from 'child_process';

//------------------------------------------------------------------------
// instancio servidor
// Cookie Parser
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.debug('directory-name:', __dirname);
const pathViews = path.join(__dirname, '../views')
const publcPath = path.join(__dirname, '../server/public')
console.log('publicPath:', publcPath);
//--------------------------------------------
// configuro el servidor
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publcPath))
app.use('../public/images', express.static('uploads'))
app.use(productsRouter)
app.use(sessionRouter)
app.use(mainRouter)
app.use(registerRouter)
app.use(contactsRouter)

//desafio 28 global child process
app.use(infoRouter)
app.use(randomRouter)

//const forked = fork('./src/desafio28/randomRoute.js')
//const forked2nd = fork('./src/desafio28/randomNumbers.js')
//forked.on('message', (msg) => {
//    console.log('msg from child process:', msg);
//})
//forked2nd.on('message', (msg) => {
//    console.log('msg from child process:', msg);
//})

//configuración de views
app.set('views', pathViews)
app.set('view engine', 'ejs')

//contabilizador de visitas
app.use(function(req, res, next) {
    console.log("Time: ", Date.now())
    next()
    })

export default app
