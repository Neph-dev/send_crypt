import React from 'react'

import '../../styles/chatStyles.css'
import '../../styles/globalStyles.css'

import Header from '../../components/Header'
import MessageFeeds from '../../components/MessageFeeds'


const Chat = () => {

    const page = 'chat'
    return (
        <div id='chat-page'>
            <Header page={page} />

            <div className='medium-separator' />
            <div className='medium-separator' />

            <div className='message-feeds-container'>
                <MessageFeeds />
            </div>
        </div>
    )
}

export default Chat