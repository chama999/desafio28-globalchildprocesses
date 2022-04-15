//route to generate random number using function randomNumbers.js
//import { getRandomNumbers } from './randomNumbers.js';
import express from 'express';
import { fork } from 'child_process';
import { setTimeout } from 'timers';
const { Router } = express
const randomRouter = new Router()

//la ruta debe recibir cómo cómo params el número de números a generar
randomRouter.get('/random/:n?', (req, res) => {


    //recibe cómo parámetro cantidad de números, sino por defecto es 100.000.000
    var n = Number(req.params.n) || 50000000
    console.log('Global-process: Cantidad de números a generar:', n)

    const child = fork('./src/desafio28/randomNumbers.js')

    if (!child) {
        console.log('Error al crear el proceso hijo')
        res.status(500).end('Error al crear el proceso hijo')
    } else {
        child.send(n)
        child.on('message', (data) => {
            console.log('Global-process: Recibiendo mensaje:', data)
            res.status(200).end(data)
        })
    }
})  

export default randomRouter