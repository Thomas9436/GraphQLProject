import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HomeView from './views/HomeView'
import Login from './views/Login'
import Register from './views/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
