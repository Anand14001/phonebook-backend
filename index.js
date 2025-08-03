const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.method == 'POST' ? JSON.stringify(req.body) :''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons= [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

    const getDateInfo = () => {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', {weekday:'long'})
    const month = currentDate.toLocaleDateString('en-US', {month:'long'})
    const day = currentDate.getDate()
    const year = currentDate.getFullYear()

    const timeOption = {
        hour : '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }

    const timeWithTimeZone = currentDate.toLocaleDateString('en-US', timeOption)

    return `${day} ${month} ${date} ${year} ${timeWithTimeZone}`
  }

  app.get('/', (request, response) => {
    response.send('<h1>Hello, welcome to phonebook</h1>')
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  } )

  app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id;
    const person = persons.find((person => person.id == id))

    if(person) {
      response.json(person)
    } else {
      response.status(404).send('<h1>Person not found!</h1>')
    }
  })

  app.delete('/api/persons/:id',(request, response)=>{
    const id = request.params.id
    const person = persons.filter((person => person.id !== id))

    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const {name, number} = request.body
    const id = Math.floor(Math.random()*1000000).toString()
    

    if(!name||!number){
      return response.status(400).json({'error':'name or number missing'})
    }

    const nameExists = persons.find((person => person.name == name))

    if(nameExists){
      response.status(400).json({'error':'name myst be unique'})
    }
    const newPerson = {
      id,
      name, 
      number
    }
    persons.push(newPerson)
    response.status(201).json(newPerson)
  })

  app.get('/info',(request, response, ) => {
   
      response.send(`<p>The phonebook has info for ${persons.length} people</p>
        <p>${getDateInfo()}</p>`)
   
  })


  const port = 3001

  app.listen(port)
  console.log('server running at port', port)