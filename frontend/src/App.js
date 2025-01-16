import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute" // Protects routes that require authentication
import { AuthProvider } from './context/AuthContext' // Provides authentication context

import Registerpage from './views/Registerpage' // Register page
import Loginpage from './views/Loginpage' // Login page
import Navbar from './views/Navbar' // Navigation bar
import Todo from './views/Todo' // Todo list page


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Navbar for navigation */}
        <Routes>
          <Route path="/login" element={<Loginpage />} /> {/* Login route */}
          <Route path="/register" element={<Registerpage />} exact /> {/* Register route */}
          <Route element={<PrivateRoute />}> {/* Protected route */}
            <Route path="/" element={<Todo />} exact /> {/* Main todo page */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}


export default App
