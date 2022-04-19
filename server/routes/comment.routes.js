import express from 'express'
import commentCtrl from '../controllers/comment.controller'

const router = express.Router()

router.route('/api/comments')
  .get(commentCtrl.list)
  .post(commentCtrl.create)


router.route('/api/comments/:commentId')

router.param('commentId', commentCtrl.commentByID)


export default router