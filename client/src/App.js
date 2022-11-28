import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { TxnProvider } from './contexts/TxnProvider'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Router from './router'


const App = () => {
  return (
    <BrowserRouter className='App'>
      <HelmetProvider>
        <TxnProvider>
          <Router />
        </TxnProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
