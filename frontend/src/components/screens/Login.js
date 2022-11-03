import React, {useState} from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
      <form>
        <h3>iSocialMedia</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        <p className="forgot-password text-right">
          Don't have an account? <a href="/sign-in">Sign up</a>
        </p>
        
      </form>
  )
}

export default Login