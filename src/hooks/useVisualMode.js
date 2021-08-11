import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /*
    Take in a new mode and 
    update the mode state with the new value
  */
  function transition(newMode, replace = false) { 
    const historyCopy = [...history];

    if (replace) {
      historyCopy.pop(); 
      // .pop will remove last element or mode in this case
    }
      historyCopy.push(newMode); 
      // newMode will replace the popped out mode
      setMode(newMode);
      setHistory(historyCopy);
  }
  
  /*
    Function that allows us to go back to the previous mode
  */
  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop(); // same thing as line 15
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]); 
      // remove end of array
    }
  };
  return { mode, transition, back };
};