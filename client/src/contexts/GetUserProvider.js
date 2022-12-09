import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import axios from 'axios'
import { API_URL } from '../service/API_URL'


export const GetUserContext = createContext()

export const GetUserProvider = ({ children }) => {
    const navigate = useNavigate()
    const cookie = Cookies.get('sijwt')
    const user_id = localStorage.getItem('user_id')

    const [userData, setUserData] = useState([])

    const getUserData = async () => {
        await axios.post(`${API_URL}users/${user_id}`, {}, { withCredentials: true })
            .then((response) => {
                setUserData(response.data.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate('/')
                    Cookies.remove('sijwt')
                }
            })
    }

    useEffect(() => {
        if (cookie) getUserData()
    }, [])

    return (
        <GetUserContext.Provider value={{ userData, getUserData }}>
            {children}
        </GetUserContext.Provider>
    )
}
