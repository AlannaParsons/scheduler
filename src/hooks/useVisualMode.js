import React, { useState } from "react";

// not using prev mode. may cause issue with stale state?
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    function transition(mode, replace = false) {

        if (replace) {
            back();
        } 
        setMode(mode);
        // setHistory(prev => ([...prev, mode]))
        history.push(mode)
        setHistory(history);

    }

    function back() {
        if (history.length > 1) {
            history.pop()
            setHistory(history);
            setMode(history[history.length-1]);
            //setHistory(prev => ([...prev, mode]))

        }
    }

    return { mode, transition, back }
}

