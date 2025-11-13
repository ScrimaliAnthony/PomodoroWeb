import { createContext, useState } from "react";

export const PhaseContext = createContext(null);

export function PhaseProvider({ initialPhase = 0, children }) {
  const [currentPhase, setCurrentPhase] = useState(initialPhase);

  const value = { currentPhase, setCurrentPhase };

  return (
    <PhaseContext.Provider value={value}>
      {children}
    </PhaseContext.Provider>
  );
}
