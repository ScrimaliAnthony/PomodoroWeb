import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PhaseProvider } from './context/PhaseContext.jsx';
import { CycleProvider } from './context/CycleContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider >
        <PhaseProvider initialPhase={0} >
          <CycleProvider initialCycle={1} initialTotalCycle={3}>
            <App />
          </CycleProvider>
        </PhaseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
