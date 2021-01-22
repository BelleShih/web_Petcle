import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mailsSchema = new Schema(
  {
    title: String,
    description: String,
    senduser: String,
    date: Date
  }
)

const petsSchema = new Schema(
  {
    user: String,
    name:  String,
    animal: String,
    breed: String,
    description : String,
    file: String,
    mails: [mailsSchema]
  }
)

const pets = mongoose.model('pets', petsSchema)

export default pets