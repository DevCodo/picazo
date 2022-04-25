const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const fs = require('fs')
const ws = require('ws')

const port = process.env.PORT || 8081

const app = express()
app.use(express.json())

// Загрузка статики
app.use(favicon(__dirname + '/build/favicon.ico'))

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  if (req.path === '/image') {
    try {
      const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
      const data = `data:image/png;base64,` + file.toString('base64')
      res.json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json('error')
    }
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})

const server = app.listen(port, () => console.log(`Server started on ${port}`))

// Работа с изображениями
app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '')
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json({ message: 'Загружено' })
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

// TODO: решить проблему с отдачей статики
// app.get('/image', (req, res) => {
//   try {
//     const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
//     const data = `data:image/png;base64,` + file.toString('base64')
//     res.json(data)
//   } catch (e) {
//     console.log(e)
//     return res.status(500).json('error')
//   }
// })

// Работа с websoket
const wss = new ws.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case 'connection':
        connectionHandler(ws, message)
        break
      case 'message':
        broadcastConnection(ws, message)
        break
      case 'draw':
        broadcastConnection(ws, message)
        break
      default:
        break
    }
  })
})

const connectionHandler = (ws, message) => {
  ws.id = message.id
  // косытль чтобы сообщение о коннекте приходило только один раз
  if (!message.connected) {
    broadcastConnection(ws, message)
  }
}

const broadcastConnection = (ws, message) => {
  wss.clients.forEach(client => {
    if (client.id === message.id) {
      client.send(JSON.stringify(message))
    }
  })
}
