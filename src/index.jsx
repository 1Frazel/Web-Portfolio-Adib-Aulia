import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initAnalytics } from './utils/analytics'

initAnalytics()

const root = createRoot(document.getElementById('root'))
root.render(<App />)
