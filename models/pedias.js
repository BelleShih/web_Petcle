import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pediaSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '缺少標題']
    },
    descripition: {
      type: String,
      maxlength: [20, '描述必需二十個字以上']
    },
    type: {
      type: String
    },
    image: {
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