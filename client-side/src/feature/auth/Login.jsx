import React from 'react'
import { Link } from 'react-router-dom'
import bg_1 from "../../assets/bg/bg-1.jpg"

const Login = () => {
  return (
    <div className='container-fluid'>
      <div className="row min-vh-100">
        <div className="col-md-8" style={{background : `url(${bg_1})`, backgroundSize : 'cover'}}></div>
        <div className="col-md-4">
          <div className='p-4'>
            <div className="d-flex flex-column mb-4">
              <span className='h2 fw-bold p-0 m-0'>Welcome back!</span>
              <span className='muted fw-bold'>Login to continue.</span>
            </div>
            <form className='mb-4'>
              <div className="form-group mb-3">
                <label htmlFor="" className='form-label'>Email/username</label>
                <input type="text" className='form-control' />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className='form-label'>Password</label>
                <input type="password" className='form-control' />
              </div>
              <div className="form-group mb-3">
                <button type='submit' className='btn btn-dark w-100'>Login</button>
              </div>
            </form>
            <div className="d-flex flex-column mb-4">
              <p className='p-0 m-0'>Not an existing user ? <Link>create new account</Link></p>
              <p className='p-0 m-0'>Forgot password ? <Link to="/reset-password">reset</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
