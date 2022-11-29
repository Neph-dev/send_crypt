import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { API_URL } from '../../service/API_URL'

import { TextAbstract } from '../../utils/textAbstract'

// import { FiCopy } from 'react-icons/fi'
// import { AiFillCheckCircle } from 'react-icons/ai'
import '../../styles/txnSectionStyles.css'
import '../../styles/txnHistoryStyles.css'


const TxnHistory = () => {

    const [transactions, setTransactions] = useState([])

    const goerliEtherscan = 'https://goerli.etherscan.io/tx/'

    useEffect(() => {
        axios.get(`${API_URL}transactions`)
            .then((response) => {
                setTransactions(response?.data?.data?.transactions)
            })
            .catch((error) => { console.log(error) })
    }, [])

    return (
        <section style={{ marginLeft: 20 }}>
            <div className='txn-title'>Transaction History</div>

            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <button
                    style={{ color: '#54626f', backgroundColor: '#e5e4e2', cursor: 'pointer' }}
                    className='header-connect-btn'>
                    All
                </button>
                <button
                    style={{ color: '#54626f', backgroundColor: '#e5e4e2', cursor: 'pointer' }}
                    className='header-connect-btn'>
                    Mine
                </button>
            </div>

            <div className='small-separator' />

            <div className='trx-history-ele-container-title'>
                <div className='trx-history-ele-title'>From</div>
                <div className='trx-history-ele-title'>To</div>
                <div className='trx-history-ele-title'>Username</div>
                <div className='trx-history-ele-title'>Sent Amount</div>
                <div className='trx-history-ele-title'>Msg</div>
            </div>
            {transactions.map((item, index) => (
                <div key={index} className='trx-history-ele-container'>
                    <div className='trx-history-ele-from-container'>
                        <a
                            rel="noreferrer"
                            href={`${goerliEtherscan}/${item.hash}`}
                            target='_blank'
                            className='trx-history-ele-from' >
                            {TextAbstract(item.from, 20)}
                        </a>
                        {/* <FiCopy siza={20} color='#fff' /> */}
                        {/* <AiFillCheckCircle siza={20} color='#a4c639' /> */}
                    </div>
                    <div className='trx-history-ele'>
                        {TextAbstract(item.to, 20)}
                        {/* <FiCopy siza={20} color='#fff' /> */}
                        {/* <AiFillCheckCircle siza={20} color='#a4c639' /> */}
                    </div>
                    <div className='trx-history-ele'>Not Found</div>
                    <div className='trx-history-ele'>{item.amount}</div>
                    <div className='trx-history-ele'>{TextAbstract(item.message, 20)}</div>
                </div>
            ))}
        </section>
    )
}

export default TxnHistory