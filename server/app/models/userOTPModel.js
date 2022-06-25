const mongoose = require('../../database/index')
const bcrypt = require('bcrypt')

const UserOTPSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date
})

UserOTPSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.otp, 10)
  this.otp = hash
  next()
})

const UserOTP = mongoose.model('UserOTP', UserOTPSchema)

module.exports = UserOTP
