import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { setCredentials } from '../../store/slice/authSlice';
import { ButtonInput, TextInput, ToastMessage } from '../../components';
import { useFormik } from 'formik';
import { registerSchemaValidation } from '../../schemas/auth.schema';
import { useRegisterUserMutation } from '../../store/api/authApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { closeAllState, toggleLoginState } from '../../store/slice/uiSlice';

const Register = () => {
  const [registerUser, { isLoading, data }] = useRegisterUserMutation();
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      mobile: '',
      password: ''
    },

    validationSchema: registerSchemaValidation,

    onSubmit: async (values) => {
      try {
        const result = await registerUser(values).unwrap();
        console.log("result", result)
        if (result?.success) {
          dispatch(setCredentials({
            user: result.data,
            accessToken: result.accessToken,
          }));
          // dispatch(closeAllState());
        }
      } catch (err) {
        setIsError(true)
        setMessage(err?.data?.message)
        console.error("Registration failed:", err);
      }
      console.log(values);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setIsError(false)
    }, 4000)
  }, [isError])

  return (
    <div className=' grid grid-cols-1 md:grid-cols-2'>
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
      <div className='p-4 bg-white rounded-xl'>
        <div className="login-header mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Ready to explore!</h2>
          <p className="text-emerald-700 font-semibold">Register your account</p>
          <p className="text-sm text-gray-600 mt-2">
            Already a user?{" "}
            <Link className="text-green-600 underline hover:text-green-800" onClick={() => dispatch(toggleLoginState())}>
              login to your account
            </Link>
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {isError ? <ToastMessage message={message} /> : null}
          {/* Email */}
          <div className="form-group">
            <label className='mx-2 font-medium text-sm text-gray-700'>Email</label>

            <TextInput
              type='text'
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='enter your email'
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-xs mx-2">{formik.errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div className="form-group">
            <label className='mx-2 font-medium text-sm text-gray-700'>Username</label>

            <TextInput
              type='text'
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='enter your username'
            />

            {formik.touched.username && formik.errors.username && (
              <p className="text-red-600 text-xs mx-2">{formik.errors.username}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className='mx-2 font-medium text-sm text-gray-700'>Phone</label>

            <TextInput
              type='text'
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='enter your phone'
            />

            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-600 text-xs mx-2">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className='mx-2 font-medium text-sm text-gray-700'>Password</label>

            <TextInput
              type='password'
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='enter your password'
            />

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-xs mx-2">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <ButtonInput
              type="submit"
              label="Register"
              variant="primary"
              loading={isLoading}
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default Register
