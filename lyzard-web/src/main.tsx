import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: React.StrictMode removed — it causes Supabase auth lock contention
// in dev (double-fires useEffect, creating two competing onAuthStateChange
// subscribers). Re-enable for production builds if desired.
createRoot(document.getElementById('root')!).render(<App />)
