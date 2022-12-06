import React, { useState } from 'react'
import { MultilineInput } from 'react-input-multiline'

import '../../styles/chatStyles.css'
import '../../styles/globalStyles.css'
import { RiSendPlaneFill } from 'react-icons/ri'


const MessageFeeds = () => {

    const [inputValue, setInputValue] = useState('')

    const handleChangeMessage = (e) => {
        setInputValue(e.target.value)
    }

    // * Remove copy and paste into message field.
    window.onload = () => {
        const messageMultilineInput = document.getElementById('message-multiline-input');
        messageMultilineInput.onpaste = e => e.preventDefault();
    }

    return (
        <>
            <div className='message-feeds'>
                <div style={{ display: 'flex', }}>
                    <MultilineInput
                        onChange={handleChangeMessage}
                        id='message-multiline-input'
                        maxLength={500}
                        placeholder='Type something in 500 words ...'
                        value={inputValue} />
                    <RiSendPlaneFill color='#fff' size={35} className='message-send-icon' />
                </div>

                <div>
                    <div className='message-text-container'>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                            <img src='https://i.postimg.cc/wvZj1jq9/photo-2022-11-19-23-39-29.jpg' className='message-icon' alt='' />
                            <div className='message-text-username'>nf_RENAGADE_ALPHA</div>
                        </div>
                        <div className='message-text'>Up maids me an ample stood given. Certainty say suffering his him collected intention promotion. Hill sold ham men made lose case. Views abode law heard jokes too. Was are delightful solicitude discovered collecting man day. Resolving neglected sir tolerably but existence conveying for. Day his put off unaffected literature partiality inhabiting.</div>
                    </div>
                    <div className='small-separator' />

                    <div className='message-text-container'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <img src='https://i.postimg.cc/wvZj1jq9/photo-2022-11-19-23-39-29.jpg' className='message-icon' alt='' />
                            <div className='message-text-username-sender'>NF_RENAGADE_ALPHA</div>
                        </div>
                        <div className='message-text-sender'>Up maids me an ample stood given. Certainty say suffering his him collected intention promotion. Hill sold ham men made lose case. Views abode law heard jokes too. Was are delightful solicitude discovered collecting man day. Resolving neglected sir tolerably but existence conveying for. Day his put off unaffected literature partiality inhabiting.</div>
                    </div>

                    <div className='medium-separator' />
                    <div className='medium-separator' />
                    <div className='medium-separator' />
                </div>
            </div>
        </>
    )
}

export default MessageFeeds