import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Character from "./components/Character.jsx";


function App() {
  const [characterId, setCharacterId] = useState(1);

  function nextPage() {
    setCharacterId((cur)=>cur+1);
  }
  function previousPage() {
    if (characterId > 1) {
      setCharacterId((cur)=>cur-1);
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="header">Star-Wars</h1>
        <h1 className="header mb">Characters</h1>
        <Character characterId={characterId} />
        <div className="button-block">
          <Button
            onClick={previousPage}
            title="Назад"
            className={characterId > 1 ? "" : "hidden"}
          />
          <Button
            onClick={nextPage}
            title="Вперед"
            className={characterId < 80 ? "" : "hidden"}
          />
        </div>
      </div>
    </>
  );
}

export default App;
