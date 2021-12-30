
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const nimi = process.argv[3]
const numero = process.argv[4]

const url =
    'mongodb+srv://dbuser:' + password + '@cluster0.fia0n.mongodb.net/part3-app?retryWrites=true&w=majority'

mongoose.connect(url)

const listingSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Listing = mongoose.model('Listing', listingSchema)

if (process.argv.length > 3) {
  const randint = Math.floor(Math.random() * 1000)

  const listing = new Listing({
    id: randint,
    name: nimi,
    number: numero,
  })

  listing.save().then(() => {
    console.log(nimi + ', p. ' + numero + ' lisätty puhelinluetteloon')
    mongoose.connection.close()
  })

} else {
  console.log('Puhelinluettelo:')
  Listing
    .find({})
    .then(j => {
      j.forEach(k => {
        console.log(k.name + ' ' + k.number)
      })
      mongoose.connection.close()
    })

}