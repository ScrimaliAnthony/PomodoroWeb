import { createContext } from "react";
import { initialPhases } from "../data/pomodoro";
import { usePersistentState } from "../hooks/usePersistentState";

export const PhaseContext = createContext(null);

const PHASES_KEY = "pomodoro:phases:v1";
const CURRENT_PHASE_KEY = "pomodoro:currentPhase:v1";

export function PhaseProvider({ initialCurrentPhase = 0, children }) {
  const [phases, setPhases] = usePersistentState(PHASES_KEY, initialPhases);
  const [currentPhase, setCurrentPhase] = usePersistentState(CURRENT_PHASE_KEY, initialCurrentPhase);

  const value = { phases, setPhases, currentPhase, setCurrentPhase };

  return (
    <PhaseContext.Provider value={value}>
      {children}
    </PhaseContext.Provider>
  );
}
