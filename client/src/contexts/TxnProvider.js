import { createContext, useState } from 'react'
// import { ethers } from "ethers"

export const TxnContext = createContext()

const { ethereum } = window

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
        else alert("Please install MetaMask.")
    }

    const disconnectWallet = async () => {
        localStorage.removeItem('eth_requestAccounts')
        window.location.reload()
    }

    return (
        <TxnContext.Provider
            value={{ connectWallet, disconnectWallet, connectionPending }}>
            {children}
        </TxnContext.Provider>
    )
}