import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login, Main, RegisterUser, SuccessReg } from '../pages'


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/request-access' element={<RegisterUser />} />
            <Route path='/main' element={<Main />} />
            <Route path='/success' element={<SuccessReg />} />
        </Routes>
    )
}

export default Router
