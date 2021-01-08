import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photosSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, '缺少使用者名稱']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    },
    description: {
      type: String,
      maxlength: [50, '描述必需五十個字以下']
    },
    animal: {
      type: mongoose.ObjectId,
      ref: 'animals'
    },
    animaltype: {
      type: mongoose.ObjectId,
      ref: 'animaltypes'
    },
    bodypart: {
      type: mongoose.ObjectId,
      ref: 'bodyparts'
    }
  }
)

const photos = mongoose.model('photos', photosSchema)

export default photos