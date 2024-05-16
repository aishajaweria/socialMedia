import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './components/context/authContext.jsx'
import { DarkModeContextProvider } from './components/context/darkModeContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
      <App/>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
