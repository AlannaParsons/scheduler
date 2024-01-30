import React, { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    function transition(mode, replace = false) {
        history.push(mode)
        setHistory(history);
        setMode(mode);
    }

    function back() {
        if (history.length > 1) {
            history.pop()
            setHistory(history);
            setMode(history[history.length-1]);
        }
    }

    return { mode, transition, back }
}

