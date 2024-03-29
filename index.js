const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())

app.use(express.static('build'))


app.use(bodyParser.json());
//creating custom token 
morgan.token('reqSent', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :reqSent')
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Charles Babbage',
    number: '45-23-6445962',
    id: 5,
  },
];

//gets the complete data
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

//gets the info page that displays information of when the request is processed
app.get('api/info', (req, res) => {
  const contactNumber = persons.length;
  const dateCreated = new Date();
  const info = `<p>Phonebook has info for ${contactNumber} people</p>
    <p>${dateCreated}</p>`;
  res.send(info);
});

//gets single phonebook entry specified with the id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 99999);

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const contactExist = persons.filter(person => person.name === body.name);

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    });
  } else if (contactExist.length > 0) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  res.json(person);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

