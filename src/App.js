import Layout from './components/Layout'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { v4 } from 'uuid'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Layout />} />
        <Route path="*" element={<Navigate to={`/${v4()}`} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
