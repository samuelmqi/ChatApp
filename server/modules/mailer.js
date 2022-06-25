const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass
  },
  tls: {
    rejectUnauthorized: false
  }
})

transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./resources/mail/')
    },
    viewPath: path.resolve('./resources/mail'),
    extName: '.html'
  })
)

module.exports = transport
