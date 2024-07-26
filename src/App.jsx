import { useEffect, useState } from "react";
import Character, {mapCharacterData} from "./components/Character.jsx";

const getUrl = (id) => `https://swapi.dev/api/people/${id}/?format=json`;


function App() {
  const [characters, setCharacters] = useState([]);
  // todo: try to remove redundancy
  const [character, setCharacter] = useState({});
  const [currentCharacterId, setCurrentCharacterId] = useState(1);
  const [count, setCount] = useState(0);

  async function getCharacter(id) {
    const existingCharacter = characters.find(character=> character.id === id)
    if (existingCharacter) {
      setCharacter(existingCharacter)
    }

    fetch(getUrl(id))
      .then((response) => response.json())
      .then(serverData=> ({id, ...mapCharacterData(serverData)}))
      .then(newCharacter=> {
        setCharacter(newCharacter)
        setCharacters(existingCharacters=>{
          if (existingCharacters.find(item=>item.id===newCharacter.id)) {
            // todo: undertand what is happening here
            return existingCharacters.map(item=>item.id===newCharacter.id
              ? newCharacter
              : item
            )
          }
          return [...existingCharacters, newCharacter]
        })
      })
  }

  function toggleLike (id) {
    // console.log('toggle like', id)
    const characterToLike = characters.find(item => item.id===id)
    characterToLike.isLike = !characterToLike.isLike
    console.log('character after like', characterToLike)
    setCharacter({...characterToLike})
  }

  async function nextPage() {
    if (currentCharacterId >= count) return;
    const newCharacterId = currentCharacterId + 1;
    setCurrentCharacterId(newCharacterId);
    getCharacter(newCharacterId)
  }

  async function previousPage() {
    if (currentCharacterId > 1) {
      const newCharacterId = currentCharacterId - 1;
      setCurrentCharacterId(newCharacterId);
      getCharacter(newCharacterId)
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

  useEffect(()=>{
    getCharacter(currentCharacterId)
  }, [currentCharacterId])

  return (
    <>
      <div className="container is-widescreen">
        <h1 className="title has-text-primary	is-size-1 has-text-centered">
          Star-Wars
        </h1>
        <h1 className="subtitle has-text-centered is-size-3 has-text-primary mb-5">
          Characters
        </h1>
        <Character character={character} toggleLike={toggleLike}/>

        <div className="buttons">
          <button
            onClick={previousPage}
            className={currentCharacterId > 1 ? "button is-info" : "is-hidden"}
          >
            Previuos
          </button>
          <button
            onClick={nextPage}
            className={currentCharacterId < count ? "button is-info" : "is-hidden"}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
