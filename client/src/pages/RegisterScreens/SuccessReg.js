import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../styles/registerUserStyles.css'
import { AiFillCheckCircle } from 'react-icons/ai'


const SuccessReg = () => {
    const navigate = useNavigate()

    const goToLogin = () => navigate("/")

    const email = 'SNEPHTHALI@GMAIL.COM'
    const username = 'RENAGADE_ALPHA'
    const avatar = 'https://i.postimg.cc/hj9SBHXF/ezgif-com-gif-maker.jpg'

    return (
        <div id='registerUser'>
            <div className='register-select-avatar-section'>
                <div style={{ width: '90%', alignItems: 'center' }}>
                    <div className='medium-separator' />
                    <img
                        src={avatar}
                        alt=''
                        className='register-selected-avatar' />
                </div>
            </div>

            <form onSubmit={goToLogin} className='register-inputs-container'>
                <div style={{ width: 500 }}>

                    <div className='register-input-container'>
                        <div className='register-input-label'>
                            USERNAME_ <b style={{ color: '#b2beb5', marginLeft: 10 }}>NF_</b>
                        </div>
                        <input
                            name='username'
                            className='register-input'
                            value={username}
                            disabled />
                    </div>
                    <div className='medium-separator' />

                    <div className='register-input-container'>
                        <div className='register-input-label'>EMAIL_</div>
                        <input
                            name='email'
                            className='register-input'
                            value={email}
                            style={{ marginLeft: 10 }}
                            disabled />
                    </div>

                    <div className='medium-separator' />

                    <div className='register-confirmation-msg'>
                        <AiFillCheckCircle
                            className='copy-icon'
                            size={30}
                            color={'#a4c639'} />
                        We've sent your password to <b> {email.toLowerCase()}</b>
                    </div>

                    <div className='medium-separator' />
                    <div className='medium-separator' />

                    <button
                        className='send-button'
                        type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SuccessReg