import React from 'react'
import copy from 'copy-to-clipboard'
import Modal from 'react-bootstrap/Modal'

import { TextAbstract } from '../../utils/textAbstract'

import { FiCopy } from 'react-icons/fi'
import '../../styles/txnModalStyles.css'


const TxnModal = ({ ...props }) => {

    const outputView = (title, value, showCopy) => (
        <div className="txnModal-ele-container">
            <div className="txnModal-ele-name">{title}</div>
            <div className="txnModal-ele-details">{TextAbstract(value, 35)}
                {showCopy === true && (
                    <FiCopy
                        className='copy-icon'
                        onClick={() => copy(value)}
                        size={20}
                        color='#36454f' />)}
            </div>
        </div>
    )

    return (
        <Modal id="txnModal" show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>TXN Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {outputView('Hash', props.hash, true)}
                {outputView('From', props.from, true)}
                {outputView('To', props.to, true)}
                {outputView('Amount (Eth)', `${props.amount}`)}
                {outputView('Timestamp', props.timestamp)}
                {outputView('Message')}
                <div className="txnModal-ele-details">{props.message}</div>

            </Modal.Body>
        </Modal>
    )
}

export default TxnModal