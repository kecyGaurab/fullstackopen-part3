const express = require('express')
const app = express()

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      },
      { 
        "name": "Charles Babbage", 
        "number": "45-23-6445962",
        "id": 5
      },

]

app.get('/info',(req,res) => {
    let contactNumber = persons.length;
    let dateCreated = new Date();
    const info = `<p>Phonebook has info for ${contactNumber} people</p>
    <p>${dateCreated}</p>`
    res.send(info)
})

app.get('/api/persons',(req,res) => {
    res.json(persons)
})

const PORT = 3001 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)