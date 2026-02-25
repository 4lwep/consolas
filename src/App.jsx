import Header from './components/header/Header'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserActions from './pages/UserActions'
import Profile from './pages/Profile'
import Processor from './pages/list/Processor'
import Consoles from './pages/list/Consoles'
import Enterprises from './pages/list/Enterprises'
import Graphics from './pages/list/Graphics'
import Console from './pages/items/Console'
import Enterprise from './pages/items/Enterprise'
import GraphicsDetail from './pages/items/GraphicsDetail'
import ProcessorDetail from './pages/items/ProcessorDetail'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/processors" element={<Processor />} />
        <Route path="/processors/:id" element={<ProcessorDetail />} />
        <Route path="/list/graphics-cards" element={<Graphics />} />
        <Route path="/graphics/:id" element={<GraphicsDetail />} />
        <Route path="/list/consoles" element={<Consoles />} />
        <Route path="/consoles/:id" element={<Console />} />
        <Route path="/list/enterprises" element={<Enterprises />} />
        <Route path="/enterprises/:id" element={<Enterprise />} />
        <Route path="/login" element={<UserActions registerTab={0} />} />
        <Route path="/register" element={<UserActions registerTab={1} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App