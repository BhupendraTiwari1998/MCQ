import React from 'react'
import Appbar from './Appbar'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = localStorage.getItem("token")
    return (
      <div>
        {
          token ? <>
            <Appbar />
            <Outlet />
  
          </> : <Navigate to={"/signin"} />
        }
      </div>
    )
}

export default ProtectedRoute