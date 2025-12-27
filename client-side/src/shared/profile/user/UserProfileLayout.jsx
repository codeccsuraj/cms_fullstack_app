import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { logout } from '../../../store/slice/authSlice';

const UserProfileLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row">
          <div className="sidebar w-full md:w-64 bg-white shadow-md rounded-lg p-6 mb-4 md:mb-0">
            <p className="text-lg font-semibold text-gray-800 mb-4">Sidebar</p>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 ml-0 md:ml-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
