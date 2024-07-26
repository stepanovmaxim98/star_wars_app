export default function Card({ name, weigth, heigth }) {
  return (
    <div className="box card">
      <h2 className="name">{name}</h2>
      <h3 className="info">Вес: {weigth}</h3>
      <h3 className="info">Рост: {heigth}</h3>
    </div>
  );
}
