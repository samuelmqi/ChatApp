const express = require('express')
const cors = require('cors')
const socket = require('socket.io')

const authRoutes = require('./app/routes/authRoutes')
const userRoutes = require('./app/routes/userRoutes')
const messageRoutes = require('./app/routes/messageRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)

const PORT = 2000
const server = app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on('connection', socket => {
  global.chatSocket = socket
  socket.on('add-user', userId => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on('send-msg', data => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message)
    }
  })
})
