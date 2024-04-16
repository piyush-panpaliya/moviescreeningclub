import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // Import moment library for date and time formatting

const Showtime = () => {
  const { movieId } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [trailer,setTrailer] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    fetchShowtimes();
  }, [movieId]);
  useEffect(() => {
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
    try{
      const response = await axios.get(`http://localhost:8000/movie/${movieId}/trailer`);
      setTrailer(response.data || []);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleAddShowtime = async () => {
    if (!date || !time) {
      console.error("Date and time must be filled");
      return;
    }
    try {
      // Add the new showtime to the database
      await axios.post(`http://localhost:8000/movie/${movieId}/showtimes`, {
        date,
        time
      });
      // Fetch updated showtimes
      fetchShowtimes();
      // Clear input fields
      setDate("");
      setTime("");
      // Hide the add form
      setShowAddForm(false);
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

  return (
    <div>
      <h2>Showtimes for Movie</h2>
      {userType === "admin" && !showAddForm && (
        <button onClick={() => setShowAddForm(true)}>Add Showtime</button>
      )}
      {showAddForm && (
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={handleAddShowtime}>Save</button>
        </div>
      )}
      <table>
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
                  <button onClick={() => handleDeleteShowtime(showtime._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Showtime;
