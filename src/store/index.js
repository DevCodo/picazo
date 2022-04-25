import create from 'zustand'
import Brush from '../canvasTools/Brush'
import Eraser from '../canvasTools/Eraser'
const url = process.env.REACT_APP_URL
  ? `ws://${process.env.REACT_APP_URL}`
  : 'wss://picazo.herokuapp.com'

const useStore = create((set, get) => ({
  connected: false,
  socket: null,
  sessionID: null,
  userName: '',
  avatarID: Math.floor(Math.random() * 10),

  canvas: null,
  tool: null,
  lineWidth: 5,
  strokeColor: '#000',
  undoList: [],
  redoList: [],

  messages: [],

  connect: () => {
    const socket = new WebSocket(url)
    set({ socket })

    socket.onopen = () => {
      const { connected, userName, sessionID } = get()

      useStore.setState({ connected: true })
      const message = {
        event: 'connection',
        connected,
        userName,
        id: sessionID
      }
      socket.send(JSON.stringify(message))
    }

    socket.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.event === 'draw') {
        get().drawHandler(message)
      } else {
        set(state => ({ messages: [...state.messages, message] }))
      }
    }

    socket.onclose = () => {
      console.log('Socket закрыт')
      get().connect()
    }

    socket.onerror = () => {
      console.log('Socket произошла ошибка')
    }
  },

  sendMessage: message => {
    const { socket, userName, sessionID, avatarID } = get()

    socket.send(
      JSON.stringify({
        event: 'message',
        userName,
        message,
        id: sessionID,
        avatarID
      })
    )
  },

  drawHandler: message => {
    const { canvas } = get()

    const figure = message.figure
    const ctx = canvas.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.lineWidth, figure.strokeColor)
        break
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
        break
      case 'finish':
        ctx.beginPath()
        break
      default:
        break
    }
  },

  setLineWidth: lineWidth => {
    const { tool } = get()

    tool.lineWidth = lineWidth

    set({ lineWidth })
  },

  setStrokeColor: strokeColor => {
    const { tool } = get()

    tool.strokeColor = strokeColor

    set({ strokeColor })
  },

  pushToUndo: data => {
    const { undoList } = get()
    set({ undoList: [...undoList, data] })
  },

  pushToRedo: data => {
    const { redoList } = get()
    set({ redoList: [...redoList, data] })
  }
}))

export default useStore
