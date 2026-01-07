import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className='container-fluid bg-light min-vh-100'>
      <div className="container bg-white min-vh-100 ">
        <div className="row">
          <div className="col-md-6 p-5">
                <div className="mb-4">
                  <h1 className="h2 fw-bold text-dark mb-2">Reset your password!</h1>
                  <p className="text-muted mb-0">Enter your email to find your account.</p>
                </div>
                <form className='mb-3'>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">Email or username</label>
                      <input type="text" className="form-control" id="email" placeholder="Enter your email or username" />
                    <div className="form-text">We'll send a reset link to this address.</div>
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Send reset link
                  </button>
                </form>
                  <div className="d-flex justify-content-between">
                    <Link to="/login" href="#" className="text-decoration-none text-muted">Back to login</Link>
                    <a href="#" className="text-decoration-none text-muted">Need help?</a>
                  </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
