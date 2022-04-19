import Comment from '../models/comment.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const comment = new Comment(req.body)
  try {
    await comment.save()
    return res.status(200).json({
      message: "Successfully created comment!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let comments = await Comment.find().select('user comment created')
    res.json(comments)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



const commentByID = async (req, res, next, id) => {
  try {
    let comment = await Comment.findById(id)
    if (!comment)
      return res.status('400').json({
        error: "Comment not found"
      })
    req.profile = comment
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve comment"
    })
  }
}

export default {
  create,
  list,
  commentByID
}
