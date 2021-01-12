import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photosSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: 'users'
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
    breeds: {
      type: mongoose.ObjectId,
      ref: 'animals.breeds'
    },
    bodyparts: {
      type: mongoose.ObjectId,
      ref: 'animals.bodypart'
    }
  }
)

const photos = mongoose.model('photos', photosSchema)

export default photos