import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { TxnContext } from '../../contexts/TxnProvider'

import '../../styles/headerStyles.css'
import { FaPowerOff } from 'react-icons/fa'


const Header = () => {

    const { connectWallet, disconnectWallet, connectionPending } = useContext(TxnContext)

    const username = localStorage.getItem('username')
    const userAvatar = localStorage.getItem('user_avatar')
    const receiver_ethAddress = localStorage.getItem('eth_requestAccounts')
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    onClick={() => navigate('/')}
                    size={25}
                    color={'#fff'}
                    className='header-logoff' />
            </div>
        </div>
    )
}

export default Header