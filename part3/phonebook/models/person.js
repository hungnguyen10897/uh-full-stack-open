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
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

const findById = (id) => {
    return Person.findById(id)
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

const deletePersonById = (id) => {
    return Person.findByIdAndDelete(id)
}

const updatePersonById = (id, person) => {
    return Person.findByIdAndUpdate(id, person)
}

module.exports = { getAll, findById, addPerson, deletePersonById, updatePersonById }