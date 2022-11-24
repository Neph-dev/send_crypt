import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../styles/headerStyles.css'
import { FaPowerOff } from 'react-icons/fa'


const Header = () => {

    const username = localStorage.getItem('username')
    const userAvatar = localStorage.getItem('user_avatar')
    const navigate = useNavigate()

    return (
        <div id='header'>
            <div className='header-container'>
                <img
                    src={userAvatar}
                    alt='avatar'
                    className='header-avatar' />
                <div className='header-username'>{username}</div>
            </div>
            <FaPowerOff
                onClick={() => navigate('/')}
                size={25}
                color={'#fff'}
                className='header-logoff' />
        </div>
    )
}

export default Header