import Score from '../models/score.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const submitScore = async (req, res) => {
  const score = new Score(req.body)
  try {
    await score.save()
    return res.status(200).json({
      message: "Successfully created score!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listScore = async (req, res) => {
  try {
    let scores = await Score.find().select('user score created')
    res.json(scores)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let score = req.body
    let deletedScore = await score.remove()
    res.json(deletedScore)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const scoreByID = async (req, res, next, id) => {
  try {
    let score = await Score.findById(id)
    if (!score)
      return res.status('400').json({
        error: "Score not found"
      })
    req.profile = score
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve score"
    })
  }
}

export default {
  submitScore,
  listScore,
  remove,
  scoreByID
}
