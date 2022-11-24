import React from 'react'

import '../../styles/txnSectionStyles.css'
import '../../styles/txnHistoryStyles.css'


const TxnHistory = () => {
    return (
        <section style={{ marginLeft: 20 }}>
            <div className='txn-title'>Transaction History</div>

            <div className='small-separator' />

            <div className='trx-history-ele-container'>
                <div className='trx-history-ele'>From</div>
                <div className='trx-history-ele'>To</div>
                <div className='trx-history-ele'>Username</div>
                <div className='trx-history-ele'>Sent Amount</div>
                <div className='trx-history-ele'>Msg</div>
            </div>
        </section>
    )
}

export default TxnHistory