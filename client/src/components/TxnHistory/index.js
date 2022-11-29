import React, { useState, useEffect, useContext } from 'react'
import copy from 'copy-to-clipboard'

import { TxnContext } from '../../contexts/TxnProvider'
import { TextAbstract } from '../../utils/textAbstract'

import { FiCopy } from 'react-icons/fi'
import { MdNavigateNext } from 'react-icons/md'
import '../../styles/txnSectionStyles.css'
import '../../styles/globalStyles.css'
import '../../styles/txnHistoryStyles.css'
import TxnModal from '../TxnModal'


const TxnHistory = () => {

    const user_id = localStorage.getItem('user_id')
    const goerliEtherscan_BaseURL = 'https://goerli.etherscan.io/tx/'

    const { getTransactionHistory, transactions } = useContext(TxnContext)

    const [filterButtonState, setFilterButtonState] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [txnDetails, setTxnDetails] = useState({
        hash: '',
        from: '',
        to: '',
        amount: '',
        timestamp: '',
        message: ''
    })

    const handleClose = () => setShowModal(false)

    const onShowModal = (item) => {
        setShowModal(true)
        setTxnDetails((prevState) => ({ ...prevState, hash: item?.hash }))
        setTxnDetails((prevState) => ({ ...prevState, from: item?.from }))
        setTxnDetails((prevState) => ({ ...prevState, to: item?.to }))
        setTxnDetails((prevState) => ({ ...prevState, amount: item?.amount }))
        setTxnDetails((prevState) => ({ ...prevState, timestamp: item?.ts }))
        setTxnDetails((prevState) => ({ ...prevState, message: item?.message }))
    }

    useEffect(() => {
        getTransactionHistory()
        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    const filterHistory = transactions?.filter((item) => {
        if (item?.txnOwner === user_id && filterButtonState === 'mine') {
            return item
        }
        else if (filterButtonState === 'all') {
            return item
        }
    })

    return (
        <>
            <TxnModal
                hash={txnDetails.hash}
                from={txnDetails.from}
                to={txnDetails.to}
                amount={txnDetails.amount}
                timestamp={txnDetails.timestamp}
                message={txnDetails.message}
                handleClose={handleClose}
                showModal={showModal} />

            <section style={{ marginLeft: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div className='txn-title'>Transaction History</div>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 30 }}>
                        <button
                            onClick={() => setFilterButtonState('all')}
                            style={{
                                color: filterButtonState === 'all' ? '#e5e4e2' : '#54626f',
                                backgroundColor: filterButtonState === 'all' ? '#54626f' : '#e5e4e2',
                                cursor: 'pointer'
                            }}
                            className='header-connect-btn'>
                            All
                        </button>
                        <button
                            onClick={() => setFilterButtonState('mine')}
                            style={{
                                color: filterButtonState === 'mine' ? '#e5e4e2' : '#54626f',
                                backgroundColor: filterButtonState === 'mine' ? '#54626f' : '#e5e4e2',
                                cursor: 'pointer'
                            }}
                            className='header-connect-btn'>
                            Mine
                        </button>
                    </div>
                </div>

                <div className='small-separator' />

                <div className='trx-history-ele-container-title'>
                    <div className='trx-history-ele-title'>From</div>
                    <div className='trx-history-ele-title'>To</div>
                    <div className='trx-history-ele-title'>Username</div>
                    <div className='trx-history-ele-title'>Sent Amount</div>
                    <div className='trx-history-ele-title'>Msg</div>
                    <div style={{ width: '5%' }}></div>
                </div>
                {filterHistory.map((item, index) => (
                    <div key={index}
                        className='trx-history-ele-container'>
                        <div className='trx-history-ele-from-container'>
                            <a
                                rel="noreferrer"
                                href={`${goerliEtherscan_BaseURL}/${item.hash}`}
                                target='_blank'
                                className='trx-history-ele-from' >
                                {TextAbstract(item.from, 20)}
                            </a>
                            <FiCopy
                                className='copy-icon'
                                onClick={() => copy(item.from)}
                                size={20}
                                color='#fff' />
                        </div>
                        <div className='trx-history-ele'>
                            {TextAbstract(item.to, 20)}
                            <FiCopy
                                className='copy-icon'
                                onClick={() => copy(item.to)}
                                size={20}
                                color='#fff' />
                        </div>
                        <div className='trx-history-ele'>Not Found</div>
                        <div className='trx-history-ele'>{item.amount}</div>
                        <div className='trx-history-ele'>{TextAbstract(item.message, 20)}</div>

                        <div
                            onClick={() => onShowModal(item)}
                            style={{ width: '5%', cursor: 'pointer' }}>
                            <MdNavigateNext
                                size={20}
                                color='#fff' />
                        </div>

                    </div>
                ))}
            </section>
        </>
    )
}

export default TxnHistory