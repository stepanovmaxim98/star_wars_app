import { useEffect, useState } from "react";
import Character from "./components/Character.jsx";

function App() {
  const [characterId, setCharacterId] = useState(1);
  const [count, setCount] = useState(0);

  function nextPage() {
    setCharacterId((cur) => cur + 1);
  }
  function previousPage() {
    if (characterId > 1) {
      setCharacterId((cur) => cur - 1);
    }
  }

  useEffect(() => {
    async function getCount() {
      try {
        const response = await fetch(
          "https://swapi.dev/api/people/?format=json"
        );
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.log(error);
      }
    }
    getCount();
  }, []);

  return (
    <>
      <div className="container is-widescreen">
        <h1 className="title has-text-primary	is-size-1 has-text-centered">
          Star-Wars
        </h1>
        <h1 className="subtitle has-text-centered is-size-3 has-text-primary">
          Characters
        </h1>
        <Character characterId={characterId} />

        <div className="buttons">
          <button
            onClick={previousPage}
            className={characterId > 1 ? "button is-info" : "is-hidden"}
          >
            Previuos
          </button>
          <button
            onClick={nextPage}
            className={characterId < count ? "button is-info" : "is-hidden"}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
