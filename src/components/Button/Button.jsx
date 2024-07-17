import "./Button.css";

export default function Button({ title, onClick, addClass }) {
  return <button onClick={onClick} className="button is-info but">{title}</button>;
}
