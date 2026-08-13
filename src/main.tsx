import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { assetCssVariables } from './constants/assets'
import './styles.css'

Object.entries(assetCssVariables).forEach(([name, value]) => {
  document.documentElement.style.setProperty(name, value)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
