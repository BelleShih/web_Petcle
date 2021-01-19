import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pediaSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '缺少標題']
    },
    description: {
      type: String
    },
    type: {
      type: String
    },
    file: {
      type: String
    },
    date: {
      type: Date
    },
    update: {
      type: Boolean
    }
  }
)

const pedias = mongoose.model('pedias', pediaSchema)

export default pedias