import mongoose from 'mongoose'

const Schema = mongoose.Schema

const albumnSchema = new Schema(
  {
    description: {
      type: mongoose.ObjectId,
      ref: 'photos'
    },
    feature: Boolean
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
    album: [albumnSchema],
    petpage: {
      type: mongoose.ObjectId,
      ref: 'pets'
    },
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