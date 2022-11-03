import React, { useEffect, Children } from 'react'
import "./App.css"
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home';
import { AuthContextProvider } from './context/AuthContext';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"

const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useAuthContext()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      navigate('/')
    }
    else {
      navigate('/login')
    }
  }, [])

  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>

  )
}


function App() {

  return (
    <AuthContextProvider>
      <Routing />
    </AuthContextProvider>
  );
}

export default App;
