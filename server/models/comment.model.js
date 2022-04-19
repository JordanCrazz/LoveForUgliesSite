import mongoose from 'mongoose'
import crypto from 'crypto'

//schema to store user object, comment, and date created
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    trim: false,
    required: 'User is required',
  },
  comment: {
    index: true,
    type: String,
    trim: true,
    required: 'Comment is required'
  },
  created: {
      type: Date,
      default: Date.now
    }
})

const commentModel = mongoose.model('comments', commentSchema)

//don't know if requred for routes
commentModel.createIndexes();
export default commentModel


