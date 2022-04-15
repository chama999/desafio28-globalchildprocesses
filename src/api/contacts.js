import express from 'express'
import { webAuth } from './session-mongo.js';
import config from '../config/config.js';

const { Router } = express
const contactsRouter = new Router()

contactsRouter.get('/contacts', (req, res) => {
    res.render('./contacts')
})

export default contactsRouter