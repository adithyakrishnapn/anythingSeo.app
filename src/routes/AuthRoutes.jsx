import React from 'react'
import { Route,Routes } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import Signup from '@/pages/auth/Signup'
import Login from '@/pages/auth/Login'


function AuthRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Routes>
    )
}

export default AuthRoutes