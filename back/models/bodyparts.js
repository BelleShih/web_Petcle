import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bodypartSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

const bodyparts = mongoose.model('bodyparts', bodypartSchema)

export default bodyparts
