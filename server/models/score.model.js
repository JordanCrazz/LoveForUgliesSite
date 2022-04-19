import mongoose from 'mongoose'
import crypto from 'crypto'

//schema to store user object, comment, and date created
const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    trim: false,
    required: 'User is required',
  },
  score: {
    index: true,
    type: Number,
    trim: true,
    required: 'Score is required',
    default: 0
  },
  created: {
      type: Date,
      default: Date.now
    }
})

const scoreModel = mongoose.model('scores', scoreSchema)

scoreModel.createIndexes();
export default scoreModel
