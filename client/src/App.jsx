import { useState } from 'react'
import "./App.css"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavBar from './components/Navbar'

function App() {
  return (
    <>
        
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
