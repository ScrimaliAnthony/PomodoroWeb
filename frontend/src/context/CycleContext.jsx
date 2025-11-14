import { createContext, useState } from "react";

export const CycleContext = createContext(null);

export function CycleProvider({ initialCycle = 0, initialTotalCycle = 3, children }) {
  const [cycle, setCycle] = useState(initialCycle);
  const [totalCycle, setTotalCycle] = useState(initialTotalCycle)

  const value = { cycle, setCycle, totalCycle, setTotalCycle };

  return (
    <CycleContext.Provider value={value}>
      {children}
    </CycleContext.Provider>
  );
}
