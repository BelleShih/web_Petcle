import mongoose from 'mongoose'

const Schema = mongoose.Schema

const disscussfeedbackSchema = new Schema(
  {
    uid: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    user: String,
    userophoto: String,
    description: String,
    date: Date
  }
)

const DiscussSchema = new Schema(
  {
    user: String,
    title: String,
    description: String,
    // 0飲食 1生活 2交友 3生病 4其他
    questiontype: String,
    date: Date,
    feedback: [disscussfeedbackSchema]
  },
  {
    versionKey: false
  }
)

const discuss = mongoose.model('discuss', DiscussSchema)

export default discuss
