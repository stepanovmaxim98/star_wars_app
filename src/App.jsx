import { useState } from "react";
import { useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [apiNumber, setApiNumber] = useState(
    "https://swapi.dev/api/people/?page=2&format=json"
  );
  useEffect(() => {
    fetch(apiNumber)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [apiNumber]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  function nextPage() {
    if (data.next !== null) {
      setApiNumber(data.next);
    } else {
      setShowButton(false);
    }
  }
  function previousPage() {
    if (data.previous !== null) {
      setApiNumber(data.previous);
    } else {
      setShowButton(false);
    }
  }

  function calculationHeight(str) {
    let height = parseInt(str, 10);
    let meters = Math.floor(height / 100);
    let centimeters = height % 100;
    return `${meters} метр${meters !== 1 ? "а" : ""} ${centimeters} сантиметр${
      centimeters !== 1 ? "ов" : ""
    }`;
  }

  return (
    <>
      <div className="container">
        <h1 className="header">Star-Wars</h1>
        <h1 className="header mb">Characters</h1>
        <div className="card-row">
          {data.results.map((e) => (
            <Card
              key={e.id}
              name={e.name}
              weigth={e.mass}
              heigth={calculationHeight(e.height)}
            />
          ))}
        </div>
        <div className="button-block">
          <Button
            onClick={previousPage}
            title="Назад"
            className={showButton === true ? "" : "hidden"}
          />
          <Button
            onClick={nextPage}
            title="Вперед"
            className={showButton === true ? "" : "hidden"}
          />
        </div>
      </div>
    </>
  );
}

export default App;
