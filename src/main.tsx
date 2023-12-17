import React from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from './application'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
)
