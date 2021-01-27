import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mailsSchema = new Schema(
  {
    sendUser: String,
    uid:{
      type: mongoose.ObjectId,
      ref: 'users'
    },
    title: String,
    description: String,
    date: Date
  }
)

const sendMailsSchema = new Schema(
  {
    forName: String,
    forId:{
      type: mongoose.ObjectId,
      ref: 'users'
    },
    title: String,
    description: String,
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
    mails: [mailsSchema],
    sendMails: [sendMailsSchema]
  }
)

const pets = mongoose.model('pets', petsSchema)

export default pets