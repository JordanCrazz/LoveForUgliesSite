import mongoose from 'mongoose'
import crypto from 'crypto'

//schema to store user object, comment, and date created
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    trim: false,
    required: 'User is required'
    default: 'Anonymous'
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

commentTable = mongoose.model('comments', commentSchema)

module.exports={
     fetchData:function(callback){
        var commentData=commentTable.find({});
        commentData.exec(function(err, data){
            if(err) throw err;
            return callback(data);
        })
     }
}