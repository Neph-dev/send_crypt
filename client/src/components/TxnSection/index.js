import React, { useState, useContext } from 'react'
import copy from 'copy-to-clipboard'
import { TextAbstract } from '../../utils/textAbstract'

import '../../styles/txnSectionStyles.css'
import { FaEthereum, FaLongArrowAltRight } from 'react-icons/fa'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FiCopy } from 'react-icons/fi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { TxnContext } from '../../contexts/TxnProvider'


const TxnSection = ({ ...props }) => {

    const { handleChange, inputData, sendTxn, isLoading } = useContext(TxnContext)

    const [copySenderAddress, setCopySenderAddress] = useState(false)
    const [copyReceiverAddress, setCopyReceiverAddress] = useState(false)

    let sender_ethAccount = localStorage.getItem('eth_requestAccounts')
    let receiver_ethAddress = localStorage.getItem('admin_ethAddress')

    const copyToClipboard = (copyText) => {
        copy(copyText)
        setTimeout(() => {
            setCopySenderAddress(false)
            setCopyReceiverAddress(false)
        }, 3000)
    }

    const onlyNumberHandler = (e) => {
        const re = /[0-9.]+/g
        if (!re.test(e.key)) e.preventDefault()
    }

    const checkFormValidity = () => {
        if (!sender_ethAccount || !receiver_ethAddress || !inputData.ethAmount) return false
        else return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!sender_ethAccount || !receiver_ethAddress || !inputData.ethAmount) return

        sendTxn()
    }

    return (
        <div id='txnSection'>
            <div className='txnSection'></div>
            <form onSubmit={handleSubmit} className='txnSection'>

                <div className='txnSection-cards-container'>
                    <div className='txnSection-card'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaEthereum className='FaEthereum' color={'#d3d3d3'} />
                            <div
                                style={{ color: (sender_ethAccount === undefined) && '#d3d3d3' }}
                                className='txnSection-card-account'>
                                {TextAbstract(sender_ethAccount, 27)}
                                {(sender_ethAccount === undefined) && '0x00000000000000000000'}
                            </div>
                        </div>
                        <div className='txnSection-card-name'>
                            USERNAME_ <b style={{ color: '#54626f' }}>{props?.username}</b>
                        </div>
                    </div>

                    <FaLongArrowAltRight color='#d3d3d3' size={40} />

                    <div className='txnSection-card' style={{ backgroundColor: '#1b1b1b' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaEthereum className='FaEthereum' color={'#d3d3d3'} />
                            <div className='txnSection-card-account'>
                                {TextAbstract(receiver_ethAddress, 30)}
                            </div>
                        </div>
                        <div className='txnSection-card-name'>
                            USERNAME_ <b style={{ color: '#d3d3d3' }}>{props.adminUsername}</b>
                        </div>
                    </div>
                </div>

                <div className='medium-separator' />

                <div className='txn-title'>
                    Transaction Information
                </div>

                <div className='small-separator' />

                <div className='input-txn-container'>
                    <div className='input-txn-label'>From</div>
                    <input
                        disabled
                        name='fromAddress'
                        value={sender_ethAccount}
                        className='input-txn'
                        placeholder='0x00000000000000000000' />
                    {copyReceiverAddress === false ?
                        <FiCopy
                            onClick={() => {
                                setCopyReceiverAddress(true)
                                copyToClipboard(sender_ethAccount)
                            }}
                            className='copy-icon'
                            size={20}
                            color={sender_ethAccount === undefined ? '#d3d3d3' : '#fff'} />
                        :
                        <AiFillCheckCircle
                            onClick={() => {
                                setCopyReceiverAddress(true)
                                copyToClipboard(sender_ethAccount)
                            }}
                            className='copy-icon'
                            size={25}
                            color={'#a4c639'} />}
                </div>

                <div className='medium-separator' />

                <div className='input-txn-container'>
                    <div className='input-txn-label'>To</div>
                    <input
                        disabled
                        name='receiver_ethAddress'
                        value={receiver_ethAddress}
                        className='input-txn'
                        style={{ color: '#a4c639' }}
                        placeholder='0x0000000000' />
                    {copySenderAddress === false ?
                        <FiCopy
                            onClick={() => {
                                setCopySenderAddress(true)
                                copyToClipboard(receiver_ethAddress)
                            }}
                            className='copy-icon'
                            size={20}
                            color={'#fff'} />
                        :
                        <AiFillCheckCircle
                            onClick={() => {
                                setCopySenderAddress(true)
                                copyToClipboard(receiver_ethAddress)
                            }}
                            className='copy-icon'
                            size={25}
                            color={'#a4c639'} />
                    }
                </div>

                <div className='medium-separator' />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='input-txn-container' style={{ width: '30%' }}>
                        <div className='input-txn-label'>Eth</div>
                        <input
                            onKeyPress={(e) => onlyNumberHandler(e)}
                            maxLength={15}
                            name='ethAmount'
                            step='0.0001'
                            type='number'
                            value={inputData.ethAmount}
                            onChange={(e) => handleChange(e, 'ethAmount')}
                            className='input-txn'
                            placeholder='1' />
                    </div>

                    <button
                        disabled={
                            isLoading === false && checkFormValidity() === true
                                ? false : true}
                        type='submit'
                        className='txn-send-btn'>
                        <RiSendPlaneFill
                            color={checkFormValidity() === false ? '#d5d5d5' : '#fff'}
                            size={25} />
                    </button>
                    {isLoading &&
                        <div className='txn-sending'>Sending ...</div>
                    }
                </div>

            </form>
        </div>
    )
}

export default TxnSection