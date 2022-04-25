import React, { useRef, useEffect } from 'react'
import useStore from '../store'
import Brush from '../canvasTools/Brush'
import axios from 'axios'
const url = process.env.REACT_APP_URL
  ? `http://${process.env.REACT_APP_URL}`
  : 'https://picazo.herokuapp.com'

function Canvas() {
  const canvasRef = useRef()
  const { setLineWidth, setStrokeColor, pushToUndo, sessionID } = useStore()

  useEffect(() => {
    useStore.setState({ canvas: canvasRef.current })
    useStore.setState({ tool: new Brush(canvasRef.current) })
    setLineWidth(5)
    setStrokeColor('#000')

    const ctx = canvasRef.current.getContext('2d')
    axios.get(`${url}/image?id=${sessionID}`).then(response => {
      console.log('response', response)
      const img = new Image()
      img.src = response.data
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    })
  }, [])

  const mouseDownHandler = () => {
    console.log(123)
    pushToUndo(canvasRef.current.toDataURL())
    axios.post(`${url}/image?id=${sessionID}`, {
      img: canvasRef.current.toDataURL()
    })
  }

  return (
    <canvas
      onMouseUp={() => mouseDownHandler()}
      ref={canvasRef}
      width={800}
      height={600}
      style={{ background: '#fff' }}
    />
  )
}

export default Canvas
