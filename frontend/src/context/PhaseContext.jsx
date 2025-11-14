import { createContext, useState } from "react";
import { initialPhases } from "../data/pomodoro";

export const PhaseContext = createContext(null);

export function PhaseProvider({ initialCurrentPhase = 0, children }) {
  const [phases, setPhases] = useState(initialPhases);
  const [currentPhase, setCurrentPhase] = useState(initialCurrentPhase);

  const value = { phases, setPhases, currentPhase, setCurrentPhase };

  return (
    <PhaseContext.Provider value={value}>
      {children}
    </PhaseContext.Provider>
  );
}
