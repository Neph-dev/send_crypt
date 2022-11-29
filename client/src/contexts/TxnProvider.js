import { createContext, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../utils/constants'

export const TxnContext = createContext()

const { ethereum } = window

const ethereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const txnContract = new ethers.Contract(contractAddress, contractABI, signer)

    return txnContract
}

export const TxnProvider = ({ children }) => {

    const [connectionPending, setConnectionPending] = useState(false)

    const connectWallet = async () => {
        // * Verify if the browser is running MetaMask.
        if (typeof ethereum !== 'undefined') {
            setConnectionPending(true)

            // * Connect to MetaMask.
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setConnectionPending(false)
            localStorage.setItem('eth_requestAccounts', accounts[0])

            window.location.reload()
        }
        else alert('Install MetaMask.')
    }

    const disconnectWallet = async () => {
        localStorage.removeItem('eth_requestAccounts')
        window.location.reload()
    }

    const sendTransaction = async () => {
        if (typeof ethereum !== 'undefined') {
            localStorage.getItem('eth_requestAccounts')
        }
        else alert('Install MetaMask.')
    }

    return (
        <TxnContext.Provider
            value={{ connectWallet, disconnectWallet, connectionPending }}>
            {children}
        </TxnContext.Provider>
    )
}