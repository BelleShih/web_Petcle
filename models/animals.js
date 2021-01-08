import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bodypartSchema = new Schema(
  {
    name: String
  }
)

const breedsSchema = new Schema(
  {
    name: String
  }
)

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少動物種類']
    },
    breeds: {
      type: [breedsSchema],
      required: [true, '缺少動物分類']
    },
    bodypart: {
      type: [bodypartSchema]
    }
  },
  {
    versionKey: false
  }
)

const animals = mongoose.model('animals', animalSchema)

export default animals
