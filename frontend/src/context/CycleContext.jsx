import { createContext } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

export const CycleContext = createContext(null);

const CYCLE_KEY = "pomodoro:cycle:v1";
const TOTAL_CYCLE_KEY = "pomodoro:totalCycle:v1";

export function CycleProvider({ initialCycle = 1, initialTotalCycle = 3, children }) {
  const [cycle, setCycle] = usePersistentState(CYCLE_KEY, initialCycle);
  const [totalCycle, setTotalCycle] = usePersistentState(TOTAL_CYCLE_KEY, initialTotalCycle);

  return (
    <CycleContext.Provider value={{ cycle, setCycle, totalCycle, setTotalCycle }}>
      {children}
    </CycleContext.Provider>
  );
}
