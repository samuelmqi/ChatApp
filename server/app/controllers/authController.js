const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('../../modules/mailer')

const User = require('../models/userModel')
const UserOTP = require('../models/userOTPModel')
const authConfig = require('../../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

const sendOTPVerificationEmail = async ({ _id, email }) => {
  try {
    let otpToken = `${Math.floor(1000 + Math.random() * 90000)}`

    const newOTP = await new UserOTP({
      userId: _id,
      otp: otpToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 900000
    })

    await newOTP.save()

    mailer.sendMail(
      {
        to: email,
        from: 'nutritech_newton@outlook.com',
        subject: 'ChatApp 2FA Verification',
        template: 'auth/twoFactor',
        context: { otpToken }
      },
      err => {
        return { error: 'Falha no envio, tente novamente', status: false }
      }
    )

    return true
  } catch (err) {
    return { error: 'Falha, tente novamente mais tarde', status: false }
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body
  const verified = true
  try {
    if (await User.findOne({ email })) {
      return res.json({ error: 'Usuário já existe', status: false })
    }
    const user = await User.create({ name, email, password, verified })
    user.password = undefined
    return res.json({
      user,
      token: generateToken({ id: user.id })
    })
  } catch (err) {
    return res.json({
      error: 'Registro de usuário falhou, tente novamente',
      status: false
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select(
    '+password +verified +twoFactorEnabled'
  )

  if (!user) {
    return res.json({ error: 'Usuário não encontrado', status: false })
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({ error: 'Email ou senha inválidos', status: false })
  }

  if (user.twoFactorEnabled === true) {
    const result = await sendOTPVerificationEmail({ _id: user.id, email })
    if (result.error) {
      return res.json(result)
    }
    user.verified = false
    user.password = undefined
    user.twoFactorEnabled = undefined
    return res.json({ user })
  }

  await User.findByIdAndUpdate(user.id, {
    $set: {
      verified: true
    }
  })

  user.twoFactorEnabled = undefined
  user.password = undefined
  user.verified = true
  res.json({
    user,
    token: generateToken({ id: user.id })
  })
}

const set2fa = async (req, res) => {
  try {
    const { userId, twoFactorEnabled } = req.body
    if (!userId) {
      return res.json({
        error: 'Falha na ativação da dupla autenticação',
        status: false
      })
    }
    await User.findByIdAndUpdate(userId, {
      $set: {
        twoFactorEnabled: twoFactorEnabled
      }
    })
    return res.json({ msg: 'Dupla autenticação alterada' })
  } catch (err) {
    return res.json({
      error: 'Falha na ativação da dupla autenticação',
      status: false
    })
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body
    const userOTP = await UserOTP.find({ userId })

    if (!userOTP) {
      res.json({ error: 'Token inválido', status: false })
    }

    const { expiresAt } = userOTP[0]
    const hashedOTP = userOTP[0].otp

    if (expiresAt < Date.now()) {
      await UserOTP.deleteMany({ userId })
      return res.json({ error: 'Token expirou', status: false })
    }

    if (!(await bcrypt.compare(otp, hashedOTP))) {
      return res.json({
        error: 'Token inválido, tente novamente',
        status: false
      })
    }

    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        verified: true
      }
    })
    user.verified = true
    await UserOTP.deleteMany({ userId })
    return res.json({
      user,
      token: generateToken({ id: user.id })
    })
  } catch (err) {
    console.log(err)
    res.json({ error: 'Falha na verificação, tente novamente', status: false })
  }
}

const resendOTP = async (req, res) => {
  try {
    const { userId, email } = req.body
    await UserOTP.deleteMany({ userId })
    const result = await sendOTPVerificationEmail({ _id: userId, email })
    if (result.error) {
      return res.json(result)
    }
  } catch (err) {
    res.json({ error: 'Falha no reenvio, tente novamente', status: false })
  }
}

//**************** Para fazer testes *********************************
const getAll = async (req, res) => {
  const users = await User.find({})
  if (!users) {
    return res.json({ error: 'Algo deu errado' })
  }
  return res.json({ users })
}

const deleteUser = async (req, res) => {
  const { id } = req.body
  const user = await User.findByIdAndDelete({ _id: id })
  return res.json({ user })
}

const getAllOTP = async (req, res) => {
  const tokens = await UserOTP.find({})
  return res.json({ tokens })
}

const deleteOTP = async (req, res) => {
  const { id } = req.body
  const token = await UserOTP.findByIdAndDelete({ _id: id })
  return res.json({ token })
}

const getUser = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email }).select('+twoFactorEnabled')
  if (!user) {
    return res.json({ error: 'Algo deu errado' })
  }
  return res.json({ user })
}

module.exports = {
  register,
  login,
  verifyOTP,
  resendOTP,
  set2fa,
  getAll,
  getUser,
  getAllOTP,
  deleteOTP,
  deleteUser
}
