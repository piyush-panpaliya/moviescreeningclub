import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeatMapPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const showtimeId = location.pathname.split("/")[2];

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSeatSelection = async (seat) => {
    try {
      // Assign the selected seat for the current showtime
      await axios.put(`http://localhost:8000/seatmap/${showtimeId}/${seat}`, { email });
      setSelectedSeat(seat);
      setErrorMessage(null); // Reset error message
    } catch (error) {
      console.error("Error assigning seat:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(`Seat ${seat} is already occupied`);
      } else {
        setErrorMessage("An error occurred while assigning the seat");
      }
    }
  };

  return (
    <div>
      <h1>Seat Map</h1>
      <h2>Showtime ID: {showtimeId}</h2>
      <h3>Email: {email}</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <h3>Select Seat:</h3>
        <div>
          <button onClick={() => handleSeatSelection("A1")}>A1</button>
          <button onClick={() => handleSeatSelection("A2")}>A2</button>
          <button onClick={() => handleSeatSelection("A3")}>A3</button>
          <button onClick={() => handleSeatSelection("A4")}>A4</button>
          <button onClick={() => handleSeatSelection("A5")}>A5</button>
          <button onClick={() => handleSeatSelection("A6")}>A6</button>
          <button onClick={() => handleSeatSelection("A7")}>A7</button>
          <button onClick={() => handleSeatSelection("A8")}>A8</button>
          <button onClick={() => handleSeatSelection("A9")}>A9</button>
          <button onClick={() => handleSeatSelection("A10")}>A10</button>
        </div>
      </div>
      {selectedSeat && (
        <p>Seat {selectedSeat} has been assigned to {email} for showtime {showtimeId}.</p>
      )}
    </div>
  );
};

export default SeatMapPage;
