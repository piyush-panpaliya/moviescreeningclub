import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeatMapPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const showtimeId = location.pathname.split("/")[2];

  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = async (seat) => {
    try {
      // Assign the selected seat for the current showtime
      await axios.put(`http://localhost:8000/seatmap/${showtimeId}/${seat}`, { email });
      setSelectedSeat(seat);
    } catch (error) {
      console.error("Error assigning seat:", error);
    }
  };

  return (
    <div>
      <h1>Seat Map</h1>
      <h2>Showtime ID: {showtimeId}</h2>
      <h3>Email: {email}</h3>
      <div>
        <h3>Select Seat:</h3>
        <div>
          <button onClick={() => handleSeatSelection("A1")}>A1</button>
          <button onClick={() => handleSeatSelection("A2")}>A2</button>
          {/* Add buttons for other seats */}
        </div>
      </div>
      {selectedSeat && (
        <p>Seat {selectedSeat} has been assigned to {email} for showtime {showtimeId}.</p>
      )}
    </div>
  );
};

export default SeatMapPage;
