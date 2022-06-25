import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { isAuthenticated } from './auth'

import Register from './pages/register/index'
import Login from './pages/login/index'
import Chat from './pages/chat/index'
import TwoAuth from './pages/twoAuth/index'
import SetAvatar from './pages/setAvatar/index'

export const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated()

  if (isAuth) {
    return children
  }

  return <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/setAvatar"
          element={
            <PrivateRoute>
              <SetAvatar />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PrivateRoute>
              <TwoAuth />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
