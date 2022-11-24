import React, { useState } from 'react'
import copy from 'copy-to-clipboard'

import '../../styles/txnSectionStyles.css'
import { FaEthereum, FaLongArrowAltRight } from 'react-icons/fa'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FiCopy } from 'react-icons/fi'
import { AiFillCheckCircle } from 'react-icons/ai'

import { ownerData } from '../Mock'


const TxnSection = ({ ...props }) => {

    const [inputs, setInputs] = useState({
        fromAddress: props.userEthAddress,
        toAddress: props.adminEthAddress
    })
    const [copyToAddress, setCopyToAddress] = useState(false)
    const [copyFromAddress, setCopyFromAddress] = useState(false)
    const [ethAmount, setEthAmount] = useState(0.1)

    const copyToClipboard = (copyText) => {
        copy(copyText)
        setTimeout(() => {
            setCopyToAddress(false)
            setCopyFromAddress(false)
        }, 3000)
    }

    const onlyNumberHandler = (e) => {
        const re = /[0-9.]+/g
        if (!re.test(e.key)) e.preventDefault()
    }

    const onChangeEthAmount = (e) => setEthAmount(e.target.value)

    const onChangeFromAddress = (e) => {
        setInputs({ ...inputs, fromAddress: e.target.value.toUpperCase() })
    }

    const TextAbstract = (text, length) => {
        if (text == null) return ""

        if (text.length <= length) return text

        text = text.substring(0, length)
        return text + "..."
    }

    return (
        <div id='txnSection'>
            <div style={{ width: '60%' }}>

                <div className='txnSection-cards-container'>
                    <div className='txnSection-card'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaEthereum size={50} color={'#d3d3d3'} />
                            <div
                                style={{
                                    color: (inputs?.fromAddress === ''
                                        || inputs?.fromAddress === undefined) && '#d3d3d3'
                                }}
                                className='txnSection-card-account'>
                                {TextAbstract(inputs?.fromAddress, 27)}
                                {(inputs?.fromAddress === '' || inputs?.fromAddress === undefined) &&
                                    '0x00000000000000000000'}
                            </div>
                        </div>
                        <div className='txnSection-card-name'>
                            USERNAME_ <b style={{ color: '#54626f' }}>{props?.username}</b>
                        </div>
                    </div>

                    <FaLongArrowAltRight color='#d3d3d3' size={40} />

                    <div className='txnSection-card' style={{ backgroundColor: '#1b1b1b' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaEthereum size={50} color={'#d3d3d3'} />
                            <div className='txnSection-card-account'>
                                {TextAbstract(props.adminEthAddress, 30)}
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
                        name='fromAddress'
                        value={inputs?.fromAddress}
                        onChange={onChangeFromAddress}
                        className='input-txn'
                        placeholder='0x00000000000000000000' />
                    {copyFromAddress === false ?
                        <FiCopy
                            onClick={() => {
                                setCopyFromAddress(true)
                                copyToClipboard(inputs?.fromAddress)
                            }}
                            className='copy-icon'
                            size={20}
                            color={'#fff'} />
                        :
                        <AiFillCheckCircle
                            onClick={() => {
                                setCopyFromAddress(true)
                                copyToClipboard(inputs?.fromAddress)
                            }}
                            className='copy-icon'
                            size={25}
                            color={'#a4c639'} />}
                </div>

                <div className='medium-separator' />

                <div className='input-txn-container'>
                    <div className='input-txn-label'>To</div>
                    <input
                        style={{ color: '#a4c639' }}
                        disabled
                        name='toAddress'
                        value={inputs?.toAddress}
                        className='input-txn'
                        placeholder='0x0000000000' />
                    {copyToAddress === false ?
                        <FiCopy
                            onClick={() => {
                                setCopyToAddress(true)
                                copyToClipboard(ownerData.address)
                            }}
                            className='copy-icon'
                            size={20}
                            color={'#fff'} />
                        :
                        <AiFillCheckCircle
                            onClick={() => {
                                setCopyToAddress(true)
                                copyToClipboard(ownerData.address)
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
                            value={ethAmount}
                            onChange={onChangeEthAmount}
                            className='input-txn'
                            placeholder='1' />
                    </div>

                    <button className='txn-send-btn'>
                        <RiSendPlaneFill color='#fff' size={25} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TxnSection