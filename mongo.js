const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://anand14901:${password}@cluster0.nxu6ce3.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('All Persons:')
  Persons.find({}).then(results => {
    results.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const persons = new Persons({
    name: name,
    number: number,
  })

  persons.save().then(results => {
    console.log(results)
    mongoose.connection.close()
  })
}
