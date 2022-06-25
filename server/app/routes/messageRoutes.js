const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  addMessage,
  getAllMessage
} = require('../controllers/messageController')

router.use(authMiddleware)

router.post('/add', addMessage)
router.post('/getAll', getAllMessage)

module.exports = router
