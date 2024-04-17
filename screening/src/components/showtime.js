import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // Import moment library for date and time formatting

const Showtime = () => {
  const { movieId, poster: encodedPosterUrl } = useParams();
  const poster = decodeURIComponent(encodedPosterUrl);
  const [showtimes, setShowtimes] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [newShowtime, setNewShowtime] = useState({ date: "", time: "" });
  const [showAddRow, setShowAddRow] = useState(false); // State variable to control the display of the blank row
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    fetchShowtimes();
    fetchTrailer();
  }, [movieId]);

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/movie/${movieId}/showtimes`);
      setShowtimes(response.data || []);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/movie/${movieId}/trailer`);
      setTrailer(response.data || "");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleAddShowtime = () => {
    setShowAddRow(true); // Set showAddRow to true when Add button is clicked
  };

  const handleSaveShowtime = async () => {
    if (!newShowtime.date || !newShowtime.time) {
      console.error("Date and time must be filled");
      return;
    }
    try {
      // Add the new showtime to the database
      await axios.post(`http://localhost:8000/movie/${movieId}/showtimes`, newShowtime);
      // Fetch updated showtimes
      fetchShowtimes();
      // Reset newShowtime and hide the add row
      setNewShowtime({ date: "", time: "" });
      setShowAddRow(false);
    } catch (error) {
      console.error("Error adding showtime:", error);
    }
  };

  const handleDeleteShowtime = async (showtimeId) => {
    try {
      // Delete the showtime from the database
      await axios.delete(`http://localhost:8000/movie/${movieId}/showtimes/${showtimeId}`);
      // Fetch updated showtimes
      fetchShowtimes();
    } catch (error) {
      console.error("Error deleting showtime:", error);
    }
  };

  const handleChange = (e, field) => {
    setNewShowtime({ ...newShowtime, [field]: e.target.value });
  };

  return (
    <div className="flex">
  <div className="flex-1">
    {/* Left partition */}
    <div className="p-4 border mb-4">
      {/* Display movie poster here */}
      <h2 className="text-lg font-bold mb-2">Movie Poster</h2>
      <img src={poster} className="object-cover w-full h-full rounded-md" alt={poster} />
    </div>
    <div className="flex-1 p-4 border overflow-auto">
      {/* Display showtimes in a table here */}
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold mb-0">Showtimes </h2>
        {userType === "admin" && (
          <button onClick={handleAddShowtime} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime, index) => (
            <tr key={index}>
              <td>{moment(showtime.date).format("DD-MM-YYYY")}</td>
              <td>{moment(showtime.time, "HH:mm").format("hh:mm A")}</td>
              {userType === "admin" && (
                <td>
                  <button onClick={() => handleDeleteShowtime(showtime._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              )}
            </tr>
          ))}
          {/* Conditional rendering for the blank row */}
          {showAddRow && userType === "admin" && (
            <tr>
              <td>
                <input type="date" value={newShowtime.date} onChange={(e) => handleChange(e, "date")} />
              </td>
              <td>
                <input type="time" value={newShowtime.time} onChange={(e) => handleChange(e, "time")} />
              </td>
              <td>
                <button onClick={handleSaveShowtime} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  <div className="flex-2" style={{ width: '80%' }}> {/* Right partition */}
    {/* Display trailer here */}
    <div className="p-4 border">
      <h2 className="text-lg font-bold mb-2">Movie Trailer</h2>
      {trailer && <iframe title="movie-trailer" width="560" height="315" src={trailer} frameBorder="0" allowFullScreen></iframe>}
    </div>
  </div>
</div>

  );
};

export default Showtime;
