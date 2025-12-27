import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Logo from '../banner/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { BsList, BsXLg } from "react-icons/bs";
import ButtonInput from '../form/ButtonInput';
import Modal from '../modal/Modal';
import Login from '../../feature/auth/Login';
import Register from '../../feature/auth/Register';
import ForgotPassword from '../../feature/auth/ForgotPassword';
import { closeAllState, toggleLoginState } from '../../store/slice/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoginState, isRegisterState, isForgotPasswordState } = useSelector((state) => state.ui);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const NAV_LINKS = [
    { name: "About us" },
    { name: "Our Services" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-md bg-opacity-90">
        <div className="flex items-center bg-[#00bf63] md:bg-white lg:bg-white justify-between px-3 py-1 lg:px-6 lg:py-2">

          {/* Hamburger for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl md:hidden lg:hidden p-1"
            aria-label="Toggle navigation"
          >
            {isOpen ? <BsXLg /> : <BsList />}
          </button>

          {/* Logo - hidden on mobile top bar */}
          <div className="hidden md:flex lg:flex">
            <Logo size="xs" />
          </div>

          {/* Desktop nav links hidden on mobile */}


          {/* Login button - always visible top right */}
          <div className="ml-auto flex gap-4">
            <ul className="hidden md:flex lg:flex space-x-4 items-center">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to="#"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonInput
              label="Login"
              variant="primary"
              onClick={() => dispatch(toggleLoginState())}
            />
          </div>
        </div>

        {/* Mobile sliding menu from top-16 */}
        <div
          className={`lg:hidden fixed top-11 left-0 h-[calc(100%-4rem)] w-64 bg-[#f1e8a7] shadow-md transform transition-transform duration-300 ease-in-out z-50 overflow-auto 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Logo inside mobile menu */}
          <div className="p-1 border-b">
            <Logo size="xs" />
          </div>

          {/* Nav links */}
          <ul className="divide-y divide-gray-200">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx} className="px-3 py-2">
                <Link
                  to="#"
                  className="text-gray-700 font-medium block hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Modal isOpen={isLoginState || isRegisterState || isForgotPasswordState} size='xxl' onClose={() => dispatch(closeAllState())}>
         {isLoginState && <Login />}
         {isRegisterState && <Register />}
         {isForgotPasswordState && <ForgotPassword />}
      </Modal>
    </>
  );
};

export default Navbar;
