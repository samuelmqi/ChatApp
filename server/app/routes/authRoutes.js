const {
  register,
  login,
  verifyOTP,
  resendOTP,
  getAll,
  set2fa,
  getUser,
  getAllOTP,
  deleteOTP,
  deleteUser
} = require('../controllers/authController')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.post('/verify', verifyOTP)
router.post('/resend', resendOTP)
router.post('/set2fa', set2fa)

// **************** Rotas para fazer testes *******************************
router.get('/get', getAll)
router.post('/user', getUser)
router.get('/getAllOTP', getAllOTP)
router.post('/deleteOTP', deleteOTP)
router.post('/deleteUser', deleteUser)

module.exports = router
