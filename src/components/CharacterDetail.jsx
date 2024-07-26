import { useParams } from 'react-router-dom';

export default function CharacterDetail() {
  const {characterId} = useParams()
  return (
    <div className="box">
      Я герой {characterId}
    </div>
  );
}
