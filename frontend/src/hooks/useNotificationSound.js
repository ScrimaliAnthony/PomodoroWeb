import { useEffect, useRef } from "react";

export function useNotificationSound(path = "end-of-task.mp3") {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = new Audio(path);
        audioRef.current = audio;
    }, [path]);

    const playNotification = () => {
        if (!audioRef.current) return;

        audioRef.current.currentTime = 0;
        audioRef.current
            .play()
            .catch((err) => {
                console.warn("Failed to play sound  :", err);
            });
    };

    return playNotification;
}
