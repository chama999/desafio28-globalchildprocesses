//connect to mongo db localhost
import mongoose from 'mongoose'
import { asPOJO, renameField, removeField, print, getDate } from './utils.js'
import config from '../config/config.js';

console.log(config.env.CONECTION_STRING_MONGO)
const connectedDB = mongoose.connect(config.env.CONECTION_STRING_MONGO, config.mongodb.options)
//const connectedDB = mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
.then(
    () => {
        console.log('connected to mongodb')
    },
    err => {
        console.log('error connecting to mongodb', err)
    }
)

class ContenedorMongoDb {
    constructor(coleccion, schema) {
        console.log(`----------Creating ${coleccion} collection-----`)
        console.log(`----------Creating ${schema} schema-----`)
        this.coleccion = mongoose.model(coleccion, schema)
    }

    async listById(id) {
        try {
            print(id)
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            print(docs)
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listByUser(user) {
        try {
            print("Validando usuario:" + user)
            const docs = await this.coleccion.findOne({ 'email': user }, { __v: 0 })
            if (docs.length == 0) {
                throw new Error('Usuario no encontrado')
            } else {
                removeField(docs, '_id')
                removeField(docs, '__v')
                console.log("Usuario validado: " + docs)
                return docs
            }
        } catch (error) {
            throw new Error(`Error al listar por Usuario: ${error}`)
        }
    }

    async listAll() {
        try {
            console.log(`----------Listing all documents from ${this.coleccion.modelName}-----`)
            //obtener todos los documentos de la coleccion en mongo
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            //convertir los documentos a objetos
            docs = docs.map(asPOJO)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            let now = getDate()
            nuevoElem = { ...nuevoElem, createdDate: now, updatedDate: now };
            console.log("Trying save object" + JSON.stringify(nuevoElem))
            console.log("Collection Name: " + this.coleccion.modelName)
            this.coleccion.create([nuevoElem]).then(nuevoElem => {
                console.log(`Saved ${JSON.stringify(nuevoElem)}`)
                nuevoElem = asPOJO(nuevoElem)
                renameField(nuevoElem, '_id', 'id')
                removeField(nuevoElem, '__v')
                console.log(`Saved ${JSON.stringify(nuevoElem)}`)
                return nuevoElem
            }).catch(err => {
                console.log(`Error al guardar: ${err}`)
                throw new Error(`Error al guardar: ${err}`)
            })
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(nuevoElem) {
        try {
            renameField(nuevoElem, 'id', '_id')
            nuevoElem.updatedDate = getDate()
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                renameField(nuevoElem, '_id', 'id')
                removeField(nuevoElem, '__v')
                return asPOJO(nuevoElem)
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongoDb