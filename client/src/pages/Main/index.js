import React from 'react'
import { Helmet } from 'react-helmet-async'

import '../../styles/mainPageStyles.css'
import '../../styles/globalStyles.css'
import show from '../../assets/Images/show.png'

import TxnSection from '../../components/TxnSection'
import Header from '../../components/Header'
import TxnHistory from '../../components/TxnHistory'


const Main = () => {

    const username = localStorage.getItem('username')
    const adminUsername = localStorage.getItem('admin_username')

    const page = 'main'

    return (
        <div id='main-page'>

            <Helmet>
                <title>Send It</title>
                <link rel="icon" href={show} />
            </Helmet>

            <Header page={page} />

            <div className='medium-separator' />
            <div className='medium-separator' />

            <section className='main-upper-section'>
                <TxnSection adminUsername={adminUsername} username={username} />
            </section>

            <div className='medium-separator' />

            <TxnHistory />

            <div className='medium-separator' />
            <div className='medium-separator' />
        </div>
    )
}

export default Main