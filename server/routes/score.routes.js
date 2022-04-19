import express from 'express'
import scoreCtrl from '../controllers/score.controller'

const router = express.Router()

router.route('/api/scores')
  .get(scoreCtrl.listScore)
  .post(scoreCtrl.submitScore)


router.route('/api/scores/:scoreId')
	.delete(scoreCtrl.remove)

router.param('scoreId', scoreCtrl.scoreByID)

  export default router