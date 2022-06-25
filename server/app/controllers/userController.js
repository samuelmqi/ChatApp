const User = require('../models/userModel')

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        isAvatarImageSet: true,
        avatarImage
      }
    })
    return res.json({ isSet: user.isAvatarImageSet, image: user.avatarImage })
  } catch (err) {
    return res.json({
      error: 'Ocorreu um erro, tente novamente',
      status: false
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'name',
      'avatarImage',
      '_id'
    ])
    return res.json(users)
  } catch (err) {
    return res.json({
      error: 'Ocorreu um erro, tente novamente',
      status: false
    })
  }
}

module.exports = {
  setAvatar,
  getAllUsers
}
