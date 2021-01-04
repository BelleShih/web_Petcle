import mongoose from 'mongoose'

const Schema = mongoose.Schema

const animaltypeSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

const animaltypes = mongoose.model('animaltypes', animaltypeSchema)

export default animaltypes
