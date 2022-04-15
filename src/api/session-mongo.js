//---------cokie parser & session ---------------------
import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import UsersDaoMongo from '../services/userDaoMongo.js';
import bcrypt from 'bcrypt';
/* ------------------------------------------------*/
/*           Persistencia por MongoDB              */
/* ------------------------------------------------*/
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
/* ------------------------------------------------*/
/*           Session Router                        */
/* ------------------------------------------------*/
const { Router } = express
const sessionRouter = new Router()

sessionRouter.use(cookieParser())
sessionRouter.use(session({
    /* ----------------------------------------------------- */
    /*           Persistencia por redis database             */
    /* ----------------------------------------------------- */
    store: MongoStore.create({ 
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb+srv://admin:jHy8b2as1xQx4q1K@cluster0.zqyx5.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    /* ----------------------------------------------------- */

    secret: 'MySecret',
    resave: false,
    saveUninitialized: false/* ,
    rolling: true,
    cookie: {
        maxAge: 60000
    } */
}))

const usersDb = new UsersDaoMongo()
const getNameSession = req => req.session.name? req.session.name: ''

sessionRouter.get('/', (req,res) => {
    if(req.session.contador) {
        req.session.contador++
        console.log(`${getNameSession(req)} visitaste la página ${req.session.contador} veces.`)
        res.redirect('/index')
    }
    else {
        let { name } = req.query
        req.session.name = name
        req.session.contador = 1
        console.log(`Nuevo ingreso: ${getNameSession(req)}. Contador Visitas: ${req.session.contador}.`)
        res.redirect('/index')
    }
})

sessionRouter.get('/logout', (req,res) => {
    const name = req.session?.name
    if (name) {
        req.session.destroy(err => {
            if (!err) {
                res.render(('./logout'), { name })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

sessionRouter.get('/error-login', (req,res) => {
    req.session.destroy(err => {
        res.render('./error-login')
    })
})

sessionRouter.get('/login', (req,res) => {
    const name = req.session?.name
    if (name) {
        //si existe la session enviamos a index
        res.redirect('/index')
    } else {
        //Redirigimos a la página de login
        res.render('./login')
    }
})

sessionRouter.post('/login', (req, res) => {
    console.log(`usuario ${req.body.name} intentando ingresar`)
    req.session.name = req.body.name
    let user = usersDb.listByUser(req.body.name).then(user => {
        console.log(`usuario encontrado ${user.email}`)
        let passwordDecrypted = bcrypt.compareSync(req.body.password, user.password)
        if ((user.email==req.body.name) && (passwordDecrypted)) {
            {res.redirect('/index')}
        }
        else {res.redirect('/error-login')}
    })
})

export function webAuth(req, res, next) {
    if (req.session?.name) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.name) {
        next()
    } else {
        res.status(401).json({ error: 'Ud. no está autorizado!' })
    }
}

export default sessionRouter
