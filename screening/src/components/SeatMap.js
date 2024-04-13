import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SeatMapPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const showtimeId = location.pathname.split("/")[2];

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [assignedSeat, setAssignedSeat] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [seatOccupancy, setSeatOccupancy] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    // If userType is not volunteer or admin, redirect to home page
    if (!userType || userType === 'standard') {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch seat occupancy information when the component mounts
    const fetchSeatOccupancy = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/seatmaprouter/seatmap/${showtimeId}/seats`);
        setSeatOccupancy(response.data);
      } catch (error) {
        console.error("Error fetching seat occupancy:", error);
      }
    };

    fetchSeatOccupancy();
  }, [showtimeId]);

  const seatAssignment = localStorage.getItem("seatassignment");
  useEffect(() => {
    if (seatAssignment === "false") {
      setTimeout(() => {
        window.location.href = "/scanner";
      }, 0);
    }
  }, [showtimeId]);
  

  const handleSeatSelection = (seat) => {
    if (assignedSeat || seatOccupancy[seat]) {
      setErrorMessage("This seat is already occupied. Please select another seat.");
      return;
    }
    setSelectedSeat(seat);
    setErrorMessage(null);
  };

  const handleConfirmSeat = async () => {
    try {
      await axios.put(`http://localhost:8000/seatmaprouter/seatmap/${showtimeId}/${selectedSeat}`, { email });
      setAssignedSeat(true);
      setErrorMessage(`The seat ${selectedSeat} is successfully assigned to ${email}. Redirecting to Scanner...`);
      localStorage.setItem("seatassignment", "false");
      // Redirect to scanner page after 3 seconds
      setTimeout(() => {
        window.location.href = "/scanner";
      }, 5000);
    } catch (error) {
      console.error("Error assigning seat:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(`Seat ${selectedSeat} is already occupied`);
      } else {
        setErrorMessage("An error occurred while assigning the seat");
      }
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {!assignedSeat && (
        <div>
          <h1>Seat Map</h1>
          <h2>Showtime ID: {showtimeId}</h2>
          <h3>Email: {email}</h3>
          <div>
            <h3>Select Seat:</h3>
            <div>
              <button
                onClick={() => handleSeatSelection("A1")}
                disabled={assignedSeat || seatOccupancy["A1"]}
                style={{color: seatOccupancy["A1"] ? "yellow" : "black" }}
              >
                A1
              </button>
              <button
                onClick={() => handleSeatSelection("A2")}
                disabled={assignedSeat || seatOccupancy["A2"]}
                style={{color: seatOccupancy["A2"] ? "red" : "black" }}
              >
                A2
              </button>
              <button
                onClick={() => handleSeatSelection("A3")}
                disabled={assignedSeat || seatOccupancy["A3"]}
                style={{color: seatOccupancy["A3"] ? "red" : "black" }}
              >
                A3
              </button>
              <button
                onClick={() => handleSeatSelection("A4")}
                disabled={assignedSeat || seatOccupancy["A4"]}
                style={{color: seatOccupancy["A4"] ? "red" : "black" }}
              >
                A4
              </button>
              <button
                onClick={() => handleSeatSelection("A5")}
                disabled={assignedSeat || seatOccupancy["A5"]}
                style={{ color: seatOccupancy["A5"] ? "red" : "black" }}
              >
                A5
              </button>
              <button
                onClick={() => handleSeatSelection("A6")}
                disabled={assignedSeat || seatOccupancy["A6"]}
                style={{color: seatOccupancy["A6"] ? "red" : "black" }}
              >
                A6
              </button>
              <button
                onClick={() => handleSeatSelection("A7")}
                disabled={assignedSeat || seatOccupancy["A7"]}
                style={{ color: seatOccupancy["A7"] ? "red" : "black" }}
              >
                A7
              </button>
              <button
                onClick={() => handleSeatSelection("A8")}
                disabled={assignedSeat || seatOccupancy["A8"]}
                style={{ color: seatOccupancy["A8"] ? "red" : "black" }}
              >
                A8
              </button>
              <button
                onClick={() => handleSeatSelection("A9")}
                disabled={assignedSeat || seatOccupancy["A9"]}
                style={{ color: seatOccupancy["A9"] ? "red" : "black" }}
              >
                A9
              </button>
              <button
                onClick={() => handleSeatSelection("A10")}
                disabled={assignedSeat || seatOccupancy["A10"]}
                style={{color: seatOccupancy["A10"] ? "red" : "black" }}
              >
                A10
              </button>
              {/* Add other seat buttons similarly */}
            </div>
          </div>
          {selectedSeat && (
            <div>
              <p>Selected Seat: {selectedSeat}</p>
              <button onClick={handleConfirmSeat}>Confirm Seat</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatMapPage;
