import useStore from '../store'
import Tool from './Tool'

export default class Eraser extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    const { socket, sessionID } = useStore.getState()
    this.mouseDown = false
    socket.send(
      JSON.stringify({
        event: 'eraser',
        id: sessionID,
        figure: {
          type: 'finish'
        }
      })
    )
  }
  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    const domRect = e.target.getBoundingClientRect()
    this.ctx.moveTo(e.pageX - domRect.left, e.pageY - domRect.top)
  }
  mouseMoveHandler(e) {
    const { socket, sessionID, lineWidth } = useStore.getState()
    const domRect = e.target.getBoundingClientRect()
    if (this.mouseDown) {
      socket.send(
        JSON.stringify({
          event: 'draw',
          id: sessionID,
          figure: {
            type: 'eraser',
            x: e.pageX - domRect.left,
            y: e.pageY - domRect.top,
            lineWidth: lineWidth
          }
        })
      )
    }
  }

  static draw(ctx, x, y, lineWidth) {
    console.log(ctx.strokeColor)
    ctx.lineWidth = lineWidth
    // ctx.strokeColor = 'white'
    useStore.getState().setStrokeColor('white')
    ctx.lineTo(x, y)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
