import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { API_URL } from '../../service/API_URL'

import Spinner from 'react-bootstrap/Spinner'
import '../../styles/globalStyles.css'
import '../../styles/registerUserStyles.css'
import '../../styles/accountStyles.css'
import { BiArrowBack } from 'react-icons/bi'


const Account = () => {

    const navigate = useNavigate()
    const user_id = localStorage.getItem('user_id')
    const user_avatar = localStorage.getItem('user_avatar')

    const [inputs, setInputs] = useState({ username: '', email: '' })
    const [avatars, setAvatars] = useState()
    const [selectedAvatar, setSelectedAvatar] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingAvatar, setIsSavingAvatar] = useState(false)

    useEffect(() => {
        axios.get(`${API_URL}users/${user_id}`)
            .then((response) => {
                setSelectedAvatar(response?.data?.data?.user?.avatar)
                setInputs({
                    ...inputs,
                    email: response?.data?.data?.user?.email.toUpperCase(),
                    username: response?.data?.data?.user?.username.toUpperCase()
                })
            })
            .catch((error) => console.error(error))

        axios.get(`${API_URL}avatars`)
            .then((response) => {
                setAvatars(response?.data?.data?.avatars)
            })
            .catch((error) => {
                console.error(error)
            })
        // eslint-disable-next-line
    }, [])

    const handleChangeEmail = (e) => {
        setInputs({ ...inputs, email: e.target.value.toUpperCase() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const data = { email: inputs.email.toLowerCase() }

        // update email address
        await axios.post(`${API_URL}users/update-email/${user_id}`, data)
            .then(() => {
                setIsLoading(false)
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }

    const updateAvatar = async () => {
        setIsSavingAvatar(true)

        const data = { avatar: selectedAvatar }

        await axios.post(`${API_URL}users/update-avatar/${user_id}`, data)
            .then(() => {
                setIsSavingAvatar(false)
                localStorage.setItem('user_avatar', selectedAvatar)
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
                setIsSavingAvatar(false)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} id='account'>

                <BiArrowBack
                    onClick={() => navigate('/main')}
                    size={40}
                    className='account-back-btn' />
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <div className='register-select-avatar-section'>
                        <div style={{ width: '90%', alignItems: 'center' }}>
                            <div className='medium-separator' />

                            <div>
                                <img src={selectedAvatar}
                                    alt=''
                                    className='register-selected-avatar' />

                                <div className='small-separator' />

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button
                                        disabled={selectedAvatar !== user_avatar
                                            || isSavingAvatar === true
                                            ? false : true}
                                        onClick={updateAvatar}
                                        className='change-avatar-save-btn'>
                                        Save
                                    </button>
                                    {isSavingAvatar &&
                                        <div className='txn-sending'> Saving...</div>
                                    }
                                </div>

                            </div>

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
                                    USERNAME_ <b style={{ color: '#b2beb5', marginLeft: 10 }}></b>
                                </div>
                                <input
                                    disabled
                                    name='username'
                                    className='account-input'
                                    value={inputs.username}
                                    placeholder='Type in a cool username'
                                    maxLength={100}
                                    autoFocus />
                            </div>
                            <div className='medium-separator' />

                            <div className='register-input-container'>
                                <div className='register-input-label'>EMAIL_</div>
                                <input
                                    name='email'
                                    value={inputs.email}
                                    className='account-input'
                                    onChange={handleChangeEmail}
                                    style={{ marginLeft: 10 }}
                                    placeholder='Type in a valid email address' />
                            </div>
                            <div className='medium-separator' />

                            <div className='register-input-container'>
                                <div className='register-input-label'>OLD PASSWORD_</div>
                                <input
                                    name='password'
                                    value={inputs.password}
                                    className='account-input'
                                    style={{ marginLeft: 10 }}
                                    placeholder='Old password' />
                            </div>
                            <div className='medium-separator' />

                            <div className='register-input-container'>
                                <div className='register-input-label'>PASSWORD_</div>
                                <input
                                    name='password'
                                    value={inputs.password}
                                    className='account-input'
                                    style={{ marginLeft: 10 }}
                                    placeholder='New password' />
                            </div>
                            <div className='medium-separator' />

                            <div className='register-input-container'>
                                <div className='register-input-label'
                                    style={{ width: '35%' }}>
                                    CONFIRM PASSWORD_
                                </div>
                                <input
                                    name='confirmPassword'
                                    value={inputs.password}
                                    className='account-input'
                                    style={{ marginLeft: 10 }}
                                    placeholder='New password' />
                            </div>

                            <div className='medium-separator' />
                            <div className='medium-separator' />

                            <button
                                className='send-button'
                                disabled={(inputs.email === '' || inputs.username === '') ? true : false}
                                type='submit'>
                                {isLoading === true ? <Spinner variant='light' /> : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Account