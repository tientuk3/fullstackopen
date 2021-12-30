const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('Yhdistetty tietokantaan')
  })
  .catch((error) => {
    console.log('Tietokantayhteys ei toimi, ks.: ', error.message)
  })

const listingSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
})

listingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

listingSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Listing', listingSchema)