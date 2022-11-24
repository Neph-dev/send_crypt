import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { API_URL } from '../../service/API_URL'

import '../../styles/loginStyles.css'
import '../../styles/globalStyles.css'
import Spinner from 'react-bootstrap/Spinner'


const LoginForm = () => {

    const [inputs, setInputs] = useState({})
    const [buttonLoad, setButtonLoad] = useState(false)
    const [loginFailedMsg, setLoginFailedMsg] = useState()

    const navigate = useNavigate()

    useEffect(() => { setInputs({}) }, [])

    const handleChangeUsername = (e) => {
        setLoginFailedMsg()
        setInputs({ ...inputs, username: e.target.value.toUpperCase() })
    }

    const handleChangePassword = (e) => {
        setLoginFailedMsg()
        setInputs({ ...inputs, password: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setButtonLoad(true)

        const data = {
            username: inputs.username,
            password: inputs.password
        }
        await axios.post(`${API_URL}authentication/login`, data)
            .then(async (response) => {
                setButtonLoad(false)
                if (response.data?.success === true) {
                    localStorage.setItem('user_id', response?.data?.data?.user?._id)
                    localStorage.setItem('user_avatar', response?.data?.data?.user?.avatar)
                    localStorage.setItem('username', response?.data?.data?.user?.username)
                    localStorage.setItem('user_ethAddress', response?.data?.data?.user?.ethAddress)

                    await axios.get(`${API_URL}users/getAdmin`)
                        .then((response) => {
                            console.log(response)
                            localStorage.setItem('admin_ethAddress', response?.data?.data?.adminEthAddress)
                            localStorage.setItem('admin_username', response?.data?.data?.adminUsername)
                            navigate('main')
                        })
                        .catch((error) => { console.log(error) })
                }
                else setLoginFailedMsg(response?.data?.message)
            })
            .catch((error) => {
                setLoginFailedMsg(error.message)
                console.error(error)
                setButtonLoad(false)
            })
    }

    const handleRequestAccess = async (e) => {
        e.preventDefault()
        navigate('/request-access')
    }

    return (
        <form onSubmit={handleSubmit} className='login-form-container'>

            <div style={{ width: '100%' }}>

                <div className='login-mainLogo-container'>
                    <img
                        src={'https://i.postimg.cc/hj9SBHXF/ezgif-com-gif-maker.jpg'}
                        className='login-mainLogo'
                        alt='logo' />
                </div>

                <div className='medium-separator' />

                <div className='login-inputs'>
                    <div>
                        <div className='login-input-label'>
                            Username
                        </div>
                        <input
                            name='username'
                            placeholder='NFx_000_0000_00000'
                            maxLength={100}
                            required={true}
                            value={inputs.username}
                            className='login-input'
                            onChange={handleChangeUsername} />
                    </div>

                    <div className='small-separator' />

                    <div>
                        <div className='login-input-label'>
                            Password
                        </div>
                        <input
                            name='password'
                            maxLength={100}
                            type="password"
                            className='login-input'
                            value={inputs.password}
                            onChange={handleChangePassword} />
                    </div>

                    <div className='medium-separator' />

                    <button
                        className='send-button'
                        disabled={(inputs.password === '' || inputs.username === '') ? true : false}
                        type='submit'>
                        {buttonLoad === true ? <Spinner variant='light' /> : 'Login'}
                    </button>

                    <div className='medium-separator' />

                    {loginFailedMsg !== undefined ?
                        <div className='login-failed-msg'>
                            {loginFailedMsg}
                        </div> : []}

                    <div
                        onClick={handleRequestAccess}
                        className='login-med-centered-text'>
                        Request Access
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginForm