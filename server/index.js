const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3030
const INDEX = path.join(__dirname, '..', 'index.html')

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`listening on ${PORT}`))

const io = require('socket.io')(server);

io.on('connection', client => {
  console.log('client connected', client.id)

  client.on('message', data => {
    console.log(data)
    io.emit('message', data)
  })

  client.on('disconnect', () => {
    console.log('client disconnected')
  })
})

setInterval(() => {
  io.emit('time', new Date().toTimeString())
}, 1000)