import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // Import moment library for date and time formatting

const ShowtimePage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType === 'standard') {
      navigate("/");
    }
  }, [navigate]);

  const seatAssignment = localStorage.getItem("seatassignment");
  useEffect(() => {
    if (seatAssignment === "false") {
      setTimeout(() => {
        window.location.href = "/scanner";
      }, 0);
    }
  }, [email]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/movie/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleShowtimeSelection = (showtimeId) => {
    navigate(`/seatmap/${showtimeId}?email=${email}`);
  };

  return (
    <div>
      <div>Access granted for {email}.</div>
      <h1>Please select a Showtime form below:</h1>
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Showtime</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            movie.showtimes.map((showtime, index) => (
              <tr key={`${movie._id}-${index}`}>
                <td>{movie.title}</td>
                <td>{moment(showtime.date).format("DD-MM-YYYY")} - {moment(showtime.time, "HH:mm").format("hh:mm A")}</td>
                <td>
                  <button onClick={() => handleShowtimeSelection(showtime._id)}>Select</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowtimePage;
