import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DartsMod() {
  const { id } = useParams();  
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
        setPlayer(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedPlayer = {
        ...player,
        name: e.target.name.value,
        birth_date: e.target.birth_date.value,
        world_ch_won: e.target.world_ch_won.value,
        profile_url: e.target.profile_url.value,
        image_url: e.target.image_url.value
      };

      await axios.put(`https://darts.sulla.hu/darts/${id}`, updatedPlayer);
      alert("Játékos adatai sikeresen frissítve.");
      navigate("/");  // Visszairányít a listázó oldalra
    } catch (error) {
      alert("Hiba történt a frissítés során.");
    }
  };

  if (loading) {
    return <p>Betöltés...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Játékos adatainak módosítása</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Név</label>
          <input
            type="text"
            className="form-control"
            defaultValue={player.name}
            name="name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Születési év</label>
          <input
            type="text"
            className="form-control"
            defaultValue={player.birth_date}
            name="birth_date"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Világbajnoki címek</label>
          <input
            type="number"
            className="form-control"
            defaultValue={player.world_ch_won}
            name="world_ch_won"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Profil URL</label>
          <input
            type="text"
            className="form-control"
            defaultValue={player.profile_url}
            name="profile_url"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kép URL</label>
          <input
            type="text"
            className="form-control"
            defaultValue={player.image_url}
            name="image_url"
          />
        </div>
        <button type="submit" className="btn btn-primary">Módosítás mentése</button>
      </form>
    </div>
  );
}

export default DartsMod;
