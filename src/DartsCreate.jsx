import React, { useState } from 'react';
import './DartsCreate.css'; 
import axios from "axios";

function DartsCreate() {
  const [playerName, setPlayerName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [worldChWon, setWorldChWon] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: playerName,
      birth_date: birthDate,
      world_ch_won: worldChWon,
      image_url: imageUrl,
    };

    if (imageUrl) {
      console.log('Új játékos URL kép:', newPlayer);
      axios.post('http://localhost:3000/', newPlayer)
        .then((response) => {
          console.log('Sikeres kérés:', response.data);
          setNotification('A játékos sikeresen hozzáadva!');
        })
        .catch((error) => {
          console.log('Hiba történt:', error);
          setNotification('Hiba történt a feltöltés során!');
        });
    } else {
      console.log('Új játékos adatai:', newPlayer);
      setNotification('A játékos sikeresen hozzáadva képek nélkül!');
    }
  };

  return (
    <div className="darts-create-container">
      <h1>Új Darts Játékos Felvitele</h1>
      {notification && <div className="notification">{notification}</div>}
      <form className="darts-create-form" onSubmit={handleSubmit}>
        <div>
          <label>Játékos neve:</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Születési dátum:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nyert világbajnokságai:</label>
          <input
            type="text"
            value={worldChWon}
            onChange={(e) => setWorldChWon(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Kép URL-je (opcionális):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Kép URL vagy fájl"
          />
        </div>

        <button type="submit">Felvitel</button>
      </form>
    </div>
  );
}

export default DartsCreate;
