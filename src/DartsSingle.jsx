import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const DartsSingle = () => {
  const { dartsId } = useParams();
  const [dartsPlayer, setDartsPlayer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
        setDartsPlayer(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [dartsId]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Hiba történt: {error}</p>;
  }

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-header text-center bg-dark text-white">
          <h2>{dartsPlayer.name}</h2>
        </div>
        <div className="card-body text-center">
          <p><strong>Születési dátum:</strong> {dartsPlayer.birth_date || "N/A"}</p>
          <p><strong>Világbajnoki címek:</strong> {dartsPlayer.world_ch_won || 0}</p>
          <img
            src={dartsPlayer.image_url || "https://via.placeholder.com/300"}
            alt={dartsPlayer.name}
            className="img-fluid my-3"
          />
          <a
            href={dartsPlayer.profile_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Profil link
          </a>
        </div>
        <div className="card-footer text-center">
          <Link to="/darts" className="btn btn-secondary">
            Vissza
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DartsSingle;
