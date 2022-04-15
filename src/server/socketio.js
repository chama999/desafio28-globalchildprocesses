import MessagesDaoMongo from '../server/db.js'
import server from '../app.js'
import { Server } from 'socket.io'
import { getDate } from '../utils/utils.js'
class Chat {
    constructor() {
        this.socket = new Server(server)
        this.messagesDB = new MessagesDaoMongo('messages', {})
        this.socket.on('connection', socket => {
            // Se ejecuta una sola vez, cuando se conecta
            // el cliente
            let now = getDate();
            
            messagesDB.listAll({},(err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    docs.forEach(doc => {
                        socket.emit('message', doc)
                    })
                }
            })
            console.log("--------------------------")
            console.log(`[${now}] Se abrió una nueva conexión !!`)
            socket.emit('message', {
                user: "admin",
                message: "Bienvenido al chat",
                createdDate: getDate()
            })
    
            // Cada vez que llega un mensaje al evento 'message'   
            socket.on("message", data => {
                console.log(data);
                messages.save(data, (err, doc) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(doc)
                    } 
                })
                io.sockets.emit("message", data)
            })
        })

        }
}

export default Chat