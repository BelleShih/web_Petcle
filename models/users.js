import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photoSchema = new Schema(
  {
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

const albumnSchema = new Schema(
  {
    description: [photoSchema],
    feature: Boolean
  }
)

const mailSchema = new Schema(
  {
    title: String,
    description: String
  }
)

const petSchema = new Schema(
  {
    name: {
      type: String
    },
    mail: [mailSchema],
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

const userSchema = new Schema(
  {
    account: {
      type: String,
      minlength: [4, '帳號必需四個字以上'],
      maxlength: [20, '帳號必需二十個字以下'],
      unique: true,
      required: '帳號必填'
    },
    password: {
      type: String,
      required: [true, '請輸入密碼']
    },
    name: {
      type: String,
      required: [true, '請輸入名稱']
    },
    email: {
      type: String,
      required: [true, '請輸入電子信箱']
    },
    pet: Boolean,
    userophoto: String,
    uploadphotos: [photoSchema],
    album: [albumnSchema],
    petpage: [petSchema],
    discuss: {
      type: mongoose.ObjectId,
      ref: 'discuss'
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
