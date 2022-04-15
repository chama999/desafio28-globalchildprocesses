import express from 'express'
const { Router } = express
const infoRouter = new Router()

infoRouter.get('/info', (req,res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')

    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
    console.log('--------------------------------------')

    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
    console.log('--------------------------------------')

    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
    console.log('--------------------------------------')

    console.log('---------- req.session.name ----------')
    console.log(req.session?.name)
    console.log('--------------------------------------')

    res.render('./info', {
        path: process.cwd(),
        processId: process.pid,
        nodeVersion: process.version,
        processTitle: process.title,
        operateSystem: process.platform,
        memoryUsage: process.memoryUsage(),
    })
})

export default infoRouter
