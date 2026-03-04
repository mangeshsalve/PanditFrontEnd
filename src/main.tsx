import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./i18n"
import App from './App'
import { Toaster } from "react-hot-toast";


import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
        <Toaster position="top-center" />
    </BrowserRouter>
  </React.StrictMode>
)
