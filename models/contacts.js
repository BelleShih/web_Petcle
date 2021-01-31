import mongoose from 'mongoose'

const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    sender: {
      type: String,
      required: [true, '寄件者必填']
    },
    mail: {
      type: String,
      required: [true, '電子信箱必填']
    },
    title: {
      type: String,
      required: [true, '主旨必填']
    },
    description: {
      type: String,
      required: [true, '想說的話必填']
    },
    date: {
      type: Date
    }
  }
)

const contacts = mongoose.model('contacts', contactSchema)

export default contacts