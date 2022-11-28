import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from '../../service/API_URL'

import Spinner from 'react-bootstrap/Spinner'
import '../../styles/globalStyles.css'
import '../../styles/registerUserStyles.css'


const RegisterUser = () => {

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({ username: '', email: '' })
    const [avatars, setAvatars] = useState()
    const [selectedAvatar, setSelectedAvatar] = useState()
    const [buttonLoad, setButtonLoad] = useState(false)

    useEffect(() => {
        localStorage.clear()
        axios.get(`${API_URL}avatars`)
            .then((response) => {
                setButtonLoad(false)
                setAvatars(response?.data?.data?.avatars)
                setSelectedAvatar(response?.data?.data?.avatars[0].link)
            })
            .catch((error) => {
                setButtonLoad(false)
                console.error(error)
            })
    }, [])

    const handleChangeUsername = (e) => {
        setInputs({ ...inputs, username: e.target.value.toUpperCase() })
    }
    const handleChangeEmail = (e) => {
        setInputs({ ...inputs, email: e.target.value.toUpperCase() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username: inputs.username,
            email: inputs.email.toLowerCase(),
            avatar: selectedAvatar,
            ethAddress: '',
        }
        setButtonLoad(true)
        await axios.post(`${API_URL}users/add`, data)
            .then(() => {
                setButtonLoad(false)
                localStorage.setItem('email', inputs?.email.toLowerCase())
                localStorage.setItem('username', inputs?.username)
                localStorage.setItem('selectedAvatar', selectedAvatar)
                navigate('/success')
            })
            .catch((error) => {
                setButtonLoad(false)
                console.log(error)
            })
    }

    return (
        <form onSubmit={handleSubmit} id='registerUser'>
            <div className='register-select-avatar-section'>
                <div style={{ width: '90%', alignItems: 'center' }}>
                    <div className='medium-separator' />

                    <img src={selectedAvatar}
                        alt=''
                        className='register-selected-avatar' />

                    <div className='medium-separator' />

                    <div className='register-avatar-list'>
                        {avatars?.map((item, index) => (
                            <div key={index}>
                                <img
                                    alt=''
                                    style={{ border: 'red' }}
                                    onClick={() => setSelectedAvatar(item?.link)}
                                    src={item?.link}
                                    className='register-avatar-element' />
                                <div className='small-separator' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='register-inputs-container'>
                <div style={{ width: 500 }}>
                    <div className='register-input-container'>
                        <div className='register-input-label'>
                            USERNAME_ <b style={{ color: '#b2beb5', marginLeft: 10 }}>NF_</b>
                        </div>
                        <input
                            name='username'
                            className='register-input'
                            value={inputs.username}
                            placeholder='Type in a cool username'
                            onChange={handleChangeUsername}
                            maxLength={100}
                            autoFocus />
                    </div>
                    <div className='medium-separator' />

                    <div className='register-input-container'>
                        <div className='register-input-label'>EMAIL_</div>
                        <input
                            name='email'
                            value={inputs.email}
                            className='register-input'
                            onChange={handleChangeEmail}
                            style={{ marginLeft: 10 }}
                            placeholder='Type in a valid email address' />
                    </div>

                    <div className='medium-separator' />
                    <div className='medium-separator' />

                    <button
                        className='send-button'
                        disabled={(inputs.email === '' || inputs.username === '') ? true : false}
                        type='submit'>
                        {buttonLoad === true ? <Spinner variant='light' /> : 'Next'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default RegisterUser