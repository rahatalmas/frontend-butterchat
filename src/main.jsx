import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './app'
import { AuthProvider } from './provider/auth-provider'
import { AiSocketProvider } from './provider/ai-socket-provider'

ReactDOM.createRoot(document.getElementById('root')).render(
      <AuthProvider>
        <AiSocketProvider url="ws://localhost:5000">
          <App />
        </AiSocketProvider>
      </AuthProvider>
)