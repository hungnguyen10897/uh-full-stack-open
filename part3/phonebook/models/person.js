require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        console.log('here')
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

const findById = (id) => {
    return Person.findById(id)
        .catch(error => {
            console.log(error)
            return undefined
        })
}

const getAll = () => {
    return Person.find({})
}

const addPerson = ({ name, number }) => {
    const person = new Person({
        name: name,
        number: number,
    })

    return person.save()
}

module.exports = { getAll, findById, addPerson }