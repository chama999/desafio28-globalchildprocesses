import util from 'util';
import faker from 'faker';


export const asPOJO = obj => JSON.parse(JSON.stringify(obj))

export const renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}
export const removeField = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}

export const print = (obj) => {
        console.log(util.inspect(obj, false, 12, true))
}

export function fakerProducts(){
        let products = []
        for (let i = 0; i < 10; i++) {
            products.push({
            id: faker.datatype.number(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.lorem.sentence(),
            image: faker.image.imageUrl()
        })
        }
        return products
    }

export function getDate(){
    let date = new Date()
    let datetimeString = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2)
    return datetimeString
}