import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const getUrl = (id) => `https://swapi.dev/api/people/${id}/?format=json`;

const mapCharacterData = (data) => {
  const { name, mass, height } = data;
  return {
    name: name ?? "Name is unknown",
    mass: mass ?? 0,
    height: height ?? "Height is unknown",
  };
};

export default function Character({ characterId }) {
  const [characterData, setCharacterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilled, setIsField] = useState(false);

  function likeClick() {
    setIsField((prevState) => !prevState);
  }

  function calculationHeight(str) {
    let height = parseInt(str, 10);
    let meters = Math.floor(height / 100);
    let centimeters = height % 100;
    return `${meters} метр${meters !== 1 ? "а" : ""} ${centimeters} сантиметр${
      centimeters !== 1 ? "ов" : ""
    }`;
  }

  useEffect(() => {
    setLoading(true);
    fetch(getUrl(characterId))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCharacterData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [characterId]);

  if (loading)
    return (
      <div className="box">
        <p className="subtitle mb-2">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="box">
        <p className="subtitle mb-2">Error: {error.message}</p>
      </div>
    );

  const { name, mass, height } = mapCharacterData(characterData);

  return (
    <div className="box">
      <h2 className="title mb-5">{name}</h2>
      <h3 className="subtitle">Вес: {mass}</h3>
      <h3 className="subtitle ">Рост: {calculationHeight(height)}</h3>
      <button onClick={likeClick} className="button is-danger">
        {isFilled ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
}
