import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import LoginForm from '../../components/LoginForm'

import '../../styles/loginStyles.css'
import hide from '../../assets/Images/hide.png'


const Login = () => {

    useEffect(() => { localStorage.clear() }, [])

    return (
        <div id='login-page'>
            <Helmet>
                <title>Send It</title>
                <link rel="icon" href={hide} />
            </Helmet>

            <div id='login-form'>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login