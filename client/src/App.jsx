import { useState } from 'react'
import "./App.css"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavBar from './components/Navbar'
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Admin from "./pages/Admin/index"
import Partner from "./pages/Partner"
import SingleMovie from './pages/User/SingleMovie'
import BookShow from './pages/User/BookShow'

function App() {
  return (
    <>
        
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/theatre" element={<Partner/>}/>  
          <Route path="/singleMovie/:id" element={<SingleMovie/>}/>
          <Route path="/bookshow/:id" element={<BookShow/>}/>    
            </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
