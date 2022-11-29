import { createContext, useState } from 'react'
import { ethers } from 'ethers'

import axios from 'axios'
import { API_URL } from '../service/API_URL'

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

    const [inputData, setInputData] = useState({ ethAmount: '', message: 'Test msg' })
    const [connectionPending, setConnectionPending] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let d = new Date()
    let date = d.getUTCDate()
    let year = d.getUTCFullYear()
    let month = d.getUTCMonth()
    let hour = d.getUTCHours()
    let minutes = d.getUTCMinutes()
    let fullDate = date + "/" + month + "/" + year + ", " + hour + ":" + minutes

    const handleChange = (e, name) => {
        setInputData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

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

    const sendTxn = async () => {
        let sender_ethAccount = localStorage.getItem('eth_requestAccounts')
        let receiver_ethAddress = localStorage.getItem('admin_ethAddress')
        const user_id = localStorage.getItem('user_id')

        try {
            if (typeof ethereum !== 'undefined') {
                const txnContract = ethereumContract()
                const parsedAmount = ethers.utils.parseEther(inputData.ethAmount)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: sender_ethAccount,
                        to: receiver_ethAddress,
                        gas: '0x5208',
                        value: parsedAmount._hex,
                    }],
                })

                const txnHash = await txnContract.makeTxn(
                    receiver_ethAddress,
                    parsedAmount,
                    inputData.message
                )

                setIsLoading(true)
                console.log('txnHash', txnHash)
                console.log(`Loading - ${txnHash.hash}`)

                const data = {
                    txnOwner: user_id,
                    from: sender_ethAccount,
                    to: receiver_ethAddress,
                    amount: inputData.ethAmount,
                    message: inputData.message,
                    hash: txnHash.hash,
                    ts: fullDate
                }

                await axios.post(`${API_URL}transactions/add`, data)
                    .then(async (response) => {
                        console.log(response)
                    })
                    .catch((error) => { console.log(error) })

                await txnHash.wait()

                console.log(`Success - ${txnHash.hash}`)

                setIsLoading(false)
            }
            else alert('Install MetaMask.')
        }
        catch (error) {
            console.log(error)
            throw new Error('No ethereum object')
        }
    }

    return (
        <TxnContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                connectionPending,
                inputData,
                handleChange,
                sendTxn,
                isLoading,
            }}>
            {children}
        </TxnContext.Provider>
    )
}