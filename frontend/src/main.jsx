import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PhaseProvider } from './context/PhaseContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhaseProvider initialPhase={0} >
      <App />
    </PhaseProvider>
  </StrictMode>,
)
