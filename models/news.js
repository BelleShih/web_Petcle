import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '缺少標題']
    },
    description: {
      type: String,
      minlength: [20, '描述必需二十個字以上']
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

const news = mongoose.model('news', newSchema)

export default news