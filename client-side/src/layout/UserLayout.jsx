import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const UserLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default UserLayout
