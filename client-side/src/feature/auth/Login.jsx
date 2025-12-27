import React from 'react';
import { ButtonInput, TextInput } from '../../components';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchemaValidation } from '../../schemas/auth.schema';
import { useDispatch } from 'react-redux';
import { toggleForgotPasswordState, toggleRegisterState } from '../../store/slice/uiSlice';
import { useAuthenticateUserMutation } from '../../store/api/authApi';
import { setCredentials } from '../../store/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [authenticateUser] = useAuthenticateUserMutation()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchemaValidation,
    onSubmit: async (values) => {
      try {
        const result = await authenticateUser(values).unwrap();
        if (result?.success) {
          dispatch(setCredentials({
            user: result.data?.user,
            accessToken: result?.data?.accessToken,
          }));
        }
        console.log(result)
      } catch (error) {
        console.log("error while logging in", error)
      }
    }
  });

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
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-emerald-700 font-semibold">Login here</p>
          <p className="text-sm text-gray-600 mt-2">
            Not an existing user?{" "}
            <Link className="text-green-600 underline hover:text-green-800" onClick={() => dispatch(toggleRegisterState())}>
              Register your account
            </Link>
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email/Username
            </label>
            <TextInput
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <TextInput
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </span>
            )}
          </div>

          {/* Button and Forgot Password */}
          <div className="flex items-center justify-between gap-4">
            <ButtonInput
              type="submit"
              label="Login"
              variant="primary"

            />
            <p className="text-sm text-green-600 cursor-pointer text-nowrap hover:text-green-800" onClick={() => dispatch(toggleForgotPasswordState())}>
              Forgot password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
