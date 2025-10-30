const express = require('express')
const morgan = require('morgan')
const { getAll, findById, addPerson } = require('./models/person')

const app = express()

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method == "POST" ? JSON.stringify(req.body) : ""
    ].join(' ')
}))
app.use(express.static('dist'))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now.toUTCString()}</p>`)
})


app.get('/api/persons', (request, response) => {
    getAll().then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
    findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    // persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!person.name || !person.number) {
        return response.status(400).send('Missing attribute')
    }

    // searchedPerson = persons.find(item => item.name === person.name)
    // if (searchedPerson) {
    //     return response.status(400).send('Duplicate')
    // }

    addPerson(person).then(addedPerson => response.json(addedPerson))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
