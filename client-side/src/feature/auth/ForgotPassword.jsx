import React from 'react'
import { ButtonInput, TextInput } from '../../components'
import { useDispatch } from 'react-redux';
import { toggleLoginState } from '../../store/slice/uiSlice';

const ForgotPassword = () => {
   const dispatch = useDispatch();
  return (
      <div className='grid grid-cols-1 md:grid-cols-2'>
      {/* Left Section */}
      <div className='hidden lg:block md:block bg-gradient-to-br from-green-50 to-indigo-100 p-8 rounded-xl flex flex-col justify-center items-center text-center'>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h2>
        <p className="text-lg text-gray-700 mb-6">
          Discover a seamless experience with our powerful tools and features.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">Easy access to your account</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">Secure and reliable</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">24/7 support</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-3 bg-white rounded-xl">
        <div className="login-header mb-6 text-center">
          <p className="text-emerald-700 font-semibold">Forget your password</p>
        </div>

        <form className="space-y-3">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Type your registered email
            </label>
            <TextInput
              type="text"
              name="email"
            />
          </div>

          {/* Button and Forgot Password */}
          <div className="space-y-3">
            <ButtonInput
              type="submit"
              label="Verify email"
              variant="primary"
            />
            <p className="text-sm text-green-600 cursor-pointer text-nowrap hover:text-green-800" onClick={() => dispatch(toggleLoginState())}>
              Back to login
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
