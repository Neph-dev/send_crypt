import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Router from './router'


const App = () => {
  return (
    <BrowserRouter className='App'>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
