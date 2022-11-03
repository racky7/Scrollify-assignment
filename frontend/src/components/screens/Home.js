import React from 'react'
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { state } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div>
      <h3>Hi, {state && state.name}</h3>
      <div className='btn btn-dark' onClick={handleLogout}>Logout</div>
    </div>

  )
}

export default Home