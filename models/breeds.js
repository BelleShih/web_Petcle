import mongoose from 'mongoose'

const Schema = mongoose.Schema

const breedtypeSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

const breeds = mongoose.model('breeds', breedSchema)

export default breeds
