import React, { useState } from 'react'
import "../../styles/Auth.css"
import { useAuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setError] = useState('')
  const { state, dispatch } = useAuthContext()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    axios.post('https://4000-racky7-scrollifyassignm-gzo3u46h5fe.ws-us74.gitpod.io/api/auth/signin', { email, password })
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        dispatch({type:"USER", payload:res.data.user})
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.error)
      });

  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>iSocialMedia</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>

          <div className="d-grid mb-3">
            <button onClick={handleLogin} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {errMsg && <p className="text-danger">
            {errMsg}
          </p>}
          <p className="forgot-password text-right">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login