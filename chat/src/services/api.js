const host = 'http://localhost:2000'

//Auth
const registerRoute = `${host}/api/auth/register`
const loginRoute = `${host}/api/auth/login`
const verifyOTPRoute = `${host}/api/auth/verify`
const resendOTPRoute = `${host}/api/auth/resend`

//User
const setAvatarRoute = `${host}/api/user/avatar`
const allUsersRoute = `${host}/api/user/all`

//Message
const sendMessageRoute = `${host}/api/message/add`
const getAllMessageRoute = `${host}/api/message/getAll`

export {
  host,
  registerRoute,
  loginRoute,
  verifyOTPRoute,
  resendOTPRoute,
  setAvatarRoute,
  allUsersRoute,
  sendMessageRoute,
  getAllMessageRoute
}
