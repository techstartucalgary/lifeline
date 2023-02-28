import { useState, useRef } from "react";

function Dev() {
  const [state, setState] = useState(["Hello", "World"]);
  const stateRef = useRef(state);

  const deleteOne = () => {
    setState(stateRef.current.slice(0, -1));
    stateRef.current = stateRef.current.slice(0, -1);
  };

  const addOne = async () => {
    const word = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    )
      .then((res) => res.json())
      .then((res) => res[0]);
    const newState = [...stateRef.current, word];
    setState(newState);
    stateRef.current = newState;
  };

  return (
    <div>
      <button onClick={deleteOne}>Delete one</button>
      <button onClick={addOne}>Add one</button>
      {state.map((s, i) => (
        <p key={i}>{s}</p>
      ))}
    </div>
  );
}

export default Dev;
