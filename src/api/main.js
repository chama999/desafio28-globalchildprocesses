import express from 'express'
import { webAuth } from './session-mongo.js';
const { Router } = express
const mainRouter = new Router()

//rutas main
mainRouter.get('/index', webAuth, (req, res) => {
    console.debug('NEW GET Main --> ejs/main.ejs')
    res.render('./main')
})

mainRouter.get('/list',webAuth, (req, res) => {
    console.debug('NEW GET /list --> ejs/list.ejs')
    res.render('./list', {list: products})
})

export default mainRouter