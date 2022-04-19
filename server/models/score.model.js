import mongoose from 'mongoose'
import crypto from 'crypto'

//schema to store user object, comment, and date created
const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    trim: false,
    required: 'User is required',
    default: 'Anonymous'
  },
  score: {
    index: true,
    type: String,
    trim: true,
    required: 'Score is required'
  },
  created: {
      type: Date,
      default: Date.now
    }
})

const scoreModel = mongoose.model('scores', scoreSchema)

scoreModel.createIndexes();
export default scoreModel
