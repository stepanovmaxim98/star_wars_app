import {useEffect, useState} from "react";

const getUrl= (id) => `https://swapi.dev/api/people/${id}/?format=json`

const mapCharacterData = (data) => {
  const { name, mass, height } = data
  return {
    name: name ?? "Name is unknown",
    mass: mass ?? 0,
    height: height ?? "Height is unknown",
  }
}


export default function Character({characterId}) {
  const [characterData, setCharacterData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function calculationHeight(str) {
    let height = parseInt(str, 10);
    let meters = Math.floor(height / 100);
    let centimeters = height % 100;
    return `${meters} метр${meters !== 1 ? "а" : ""} ${centimeters} сантиметр${
      centimeters !== 1 ? "ов" : ""
    }`;
  }

  useEffect(() => {
    setLoading(true)
    fetch(getUrl(characterId))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCharacterData(data);
    })
    .catch((error) => {
      setError(error);
    }).finally(()=>{
      setLoading(false)
    });
  }, [characterId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, mass, height } = mapCharacterData(characterData)

  return (
    <div className="box card">
      <h2 className="name">{name}</h2>
      <h3 className="info">Вес: {mass}</h3>
      <h3 className="info">Рост: {calculationHeight(height)}</h3>
    </div>
  );
}
