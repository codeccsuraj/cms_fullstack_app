import React from 'react'
import { useSelector } from 'react-redux';

const HomePage = () => {
 const isAuthenticated = useSelector((state) => state.auth);
  return (
    <div className="w-full box-border px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full md:max-w-8xl lg:max-w-8xl my-3 rounded-2xl bg-[#00bf63]">
        <div className='p-6'>
          <h1 className="text-xl lg:text-7xl font-extrabold mb-4 text-white">
            Welcome to <br/> <span className="text-yellow-300">Tangle</span>
          </h1>
        </div>
      </div>
    </div>

  )
}

export default HomePage
