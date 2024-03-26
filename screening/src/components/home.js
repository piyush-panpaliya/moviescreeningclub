import React, { useState, useEffect } from "react";
import axios from "axios";

import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    axios.get("http://localhost:8000/movies")
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div>
      <h1>Movie Ticket Booking</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Genre: {movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
