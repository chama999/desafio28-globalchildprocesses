//--------- Imports --------------------
import express from 'express';
import UsersDaoMongo from '../services/userDaoMongo.js';
//---------- Encrypt --------------------
import bcrypt from 'bcrypt';
const saltRounds = 10;
/* ------------------------------------------------*/
/*           Session Router                        */
/* ------------------------------------------------*/
const { Router } = express
const registerRouter = new Router()
let usersDb = new UsersDaoMongo()

registerRouter.get('/register', (req,res) => {
    res.render('./register') 
})

registerRouter.post('/register', (req,res) => {

    let passwordEncrypted = bcrypt.hashSync(req.body.password, saltRounds)
    let user = {
        name : req.body.name,
        email : req.body.mail,
        password : passwordEncrypted,
        age : Number(req.body.age)
    }
    //Guardamos el usuario en la base de datos
    //Trying saving the user in the database
    usersDb.save(user).then(() => {
        console.log(`User [${req.body.email}] registered succesfully`)
        //alert(`User [${req.body.email}] registered succesfully`, 'Éxito')
        res.redirect('/login')
    }).catch(err => {
        console.log('Error while trying save user' + err)
    })
})

export default registerRouter
