import express from 'express'
import commentCtrl from '../controllers/comment.controller'

const router = express.router()

router.route('/api/comments')
  .get(commentCtrl.list)
  .post(commentCtrl.create)


router.route('/api/comments/:commentId')
	.delete(commentCtrl.remove)



  export default router