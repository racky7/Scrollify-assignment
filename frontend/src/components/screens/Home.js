import React from 'react'
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import CreatePost from '../CreatePost'

const Home = () => {
  const { state } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <h3>Hi, {state && state.name}</h3>
      <div className='btn btn-dark' onClick={handleLogout}>Logout</div>
      <div className='m-3'>
      <CreatePost/>
      </div>
      
    </div>

  )
}

export default Home