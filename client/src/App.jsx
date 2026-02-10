import { useState } from 'react'
import "./App.css"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavBar from './components/Navbar'
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Admin from "./pages/Admin/index"
import Partner from "./pages/Partner"
import SingleMovie from './pages/User/SingleMovie'
import BookShow from './pages/User/BookShow'
import RoleBasedRoute from './components/RoleBasedRoute'
import MyBooking from './pages/User/MyBooking'
import PaymentSuccess from './pages/PaymentSuccess'
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          {/*Landing Page*/}
          <Route path="/" element={<Landing/>}/>

          {/*Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/*Protected Routes - User Only*/}

          <Route path="/home" element={<ProtectedRoute>
            <RoleBasedRoute allowedRoles={["user"]}>
              <Home />
            </RoleBasedRoute>
          </ProtectedRoute>} />
          
          <Route path="/singleMovie/:id" element={<ProtectedRoute>
            <RoleBasedRoute allowedRole={["user"]}>
             <SingleMovie />
            </RoleBasedRoute>
          </ProtectedRoute>}/>

          <Route path="/bookshow/:id" element={<ProtectedRoute>
            <RoleBasedRoute allowedRole={["user"]}>
              <BookShow />
            </RoleBasedRoute>
          </ProtectedRoute>}/>

         <Route path="/payment-success" 
         element={<PaymentSuccess />}
            />

          <Route path="/my-bookings" element={<ProtectedRoute>
            <RoleBasedRoute allowedRole={["user"]}>
              <MyBooking />
            </RoleBasedRoute>
          </ProtectedRoute>}/>

          {/*Protected Routes-Other roles*/}
          
          <Route path="/admin" element={<ProtectedRoute>
            <RoleBasedRoute allowedRole={["admin"]}>
            <Admin />
            </RoleBasedRoute>
          </ProtectedRoute>}/>

          <Route path="/theatre" element={<ProtectedRoute>
            <RoleBasedRoute allowedRole={["partner"]}>
              <Partner />
            </RoleBasedRoute>
          </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
