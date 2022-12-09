import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { TxnContext } from '../../contexts/TxnProvider'

import '../../styles/headerStyles.css'
import { FaPowerOff, FaExchangeAlt } from 'react-icons/fa'
import { BiLoaderCircle } from 'react-icons/bi'


const Header = ({ ...props }) => {

    const { connectWallet, disconnectWallet, connectionPending } = useContext(TxnContext)

    const username = localStorage.getItem('username')
    const userAvatar = localStorage.getItem('user_avatar')
    const receiver_ethAddress = localStorage.getItem('eth_requestAccounts')
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
        Cookies.remove('sijwt')
    }

    return (
        <div id='header'>
            <div onClick={() => navigate('/account')} className='header-container'>
                <img
                    src={userAvatar}
                    alt='avatar'
                    className='header-avatar' />
                <div className='header-username'>{username}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <FaExchangeAlt
                    title='Main'
                    onClick={() => navigate('/main')}
                    size={25}
                    style={{ color: props.page === 'main' ? '#ccc' : '#fff' }}
                    className='header-icon' />

                <BiLoaderCircle
                    title='Chat'
                    onClick={() => navigate('/chat')}
                    size={25}
                    style={{ color: props.page === 'chat' ? '#ccc' : '#fff' }}
                    className='header-icon' />

                {receiver_ethAddress === null ?
                    <button
                        disabled={connectionPending}
                        onClick={connectWallet}
                        style={{ color: '#54626f', backgroundColor: '#e5e4e2', cursor: 'pointer' }}
                        className='header-connect-btn'>
                        Connect
                    </button>
                    :
                    <button
                        disabled={connectionPending}
                        onClick={disconnectWallet}
                        style={{ color: '#54626f', backgroundColor: '#e5e4e2', cursor: 'pointer' }}
                        className='header-connect-btn'>
                        Disconnect
                    </button>
                }

                <FaPowerOff
                    onClick={handleLogout}
                    size={25}
                    color={'#fff'}
                    className='header-icon' />
            </div>
        </div>
    )
}

export default Header