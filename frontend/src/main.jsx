import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PhaseProvider } from './context/PhaseContext.jsx';
import { CycleProvider } from './context/CycleContext.jsx';
import "./main.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhaseProvider initialPhase={0} >
      <CycleProvider initialCycle={1} initialTotalCycle={3}>
        <App />
      </CycleProvider>
    </PhaseProvider>
  </StrictMode>,
)
