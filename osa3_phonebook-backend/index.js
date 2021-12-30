
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Listing = require('./models/listing')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))



morgan.token('post_data', function(req) {
  if (req.body.name) {
    return JSON.stringify(req.body)
  } else {
    return null
  }
})

/*
let luettelo = [
  {
    id: 1,
    name: 'Tuukka',
    number: '00000'
  },
  {
    id: 2,
    name: 'Lörs Lärä',
    number: '12345'
  },
  {
    id: 3,
    name: 'Pete Kauppinen',
    number: '99999'
  },
  {
    id: 4,
    name: 'PeteK',
    number: '0009900'
  }
]
*/


app.get('/', (request, response) => {
  response.send('<h1>moe</h1>')
})

app.get('/info', (request, response, next) => {

  Listing.countDocuments()
    .then((count) => {
      const aika = new Date()
      const lause = '<p>Puhelinluettelossa on ' + count + ' yhteystietoa</p>\n'
      response.send(lause + aika)
    })
    .catch(error => next(error))
})

// listaa kaikki yhteystiedot
app.get('/api/persons', (request, response) => {
  Listing.find({}).then(notes => {
    response.json(notes)
  })
})

// listaa yksittäinen yhteystieto
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Listing.findById(id)
    .then(yhteystieto => {
      if (yhteystieto) { // yhteystieto löytyi ja palautetaan json responsena
        console.log('haku onnistui, id '+id)
        response.json(yhteystieto)
      } else { // id oli oikean muotoinen mutta virheellinen
        response.status(404).end()
      }
    })
    .catch(error => { // id virheellisessä muodossa
      next(error)
    })
})

// poista yhteystieto
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Listing.findByIdAndRemove(id)
    .then( () => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// päivitä yhteystieto
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const yhteystieto = {
    name: body.name,
    number: body.number
  }

  Listing.findByIdAndUpdate(id, yhteystieto, { new: true, runValidators: true })
    .then(updated => {
      console.log('päivitys onnistui')
      if (updated) {
        response.json(updated)
      } else {
        response.json({ error: 'käyttäjää ei ole olemassa' })
      }
    })
    .catch(error => {
      console.log('epäonnistunut päivitys')
      next(error)
    })

})

// lisää uusi yhteystieto
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) { // nimi- tai numerokenttä tyhjänä
    return response.status(400).json({
      error: 'nimi tai numero puuttuu'
    })
  }

  const yhteystieto = new Listing({
    name: body.name,
    number: body.number
  })

  yhteystieto.save()
    .then(k => {
      response.json(k)
    })
    .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id: virheellinen muoto' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT ,() => {
  console.log('Server running on port ' + PORT)
})
