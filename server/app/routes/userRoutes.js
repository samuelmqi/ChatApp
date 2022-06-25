const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')

const { setAvatar, getAllUsers } = require('../controllers/userController')

router.use(authMiddleware)

router.post('/avatar/:id', setAvatar)
router.get('/all/:id', getAllUsers)

module.exports = router
