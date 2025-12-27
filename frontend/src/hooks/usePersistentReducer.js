import { useEffect, useReducer } from "react";

export function usePersistentReducer(reducer, initialState, storageKey) {
    function init(initial) {
        const raw = localStorage.getItem(storageKey);
        if (!raw) {
            return initial;
        }

        try {
            const parsed = JSON.parse(raw);
            return parsed ?? initial;
        } catch {
            return initial;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState, init);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [storageKey, state]);

    return [state, dispatch];
}
