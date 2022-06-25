const Message = require('../models/messageModel')

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from
    })
    if (data) {
      return res.json({ msg: 'Mensagme adicionada' })
    } else {
      return res.json({ error: 'Falha ao adicionar mensagem', status: false })
    }
  } catch (err) {
    return res.json({ error: 'Falha ao adicionar mensagem', status: false })
  }
}

const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body
    const messages = await Message.find({
      users: {
        $all: [from, to]
      }
    }).sort({ updatedAt: 1 })
    const projectMessages = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })
    return res.json(projectMessages)
  } catch (err) {
    return res.json({ error: 'Falha ao buscar as mensagens', status: false })
  }
}

module.exports = { addMessage, getAllMessage }
