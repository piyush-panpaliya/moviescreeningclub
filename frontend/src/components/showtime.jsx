import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/getToken";
import moment from "moment"; // Import moment library for date and time formatting
import { SERVERIP } from "../config";

const Showtime = () => {
  const location = useLocation();
  const [movieId, setMovieId] = useState("");
  const [poster, setPoster] = useState("");
  const token = getToken();
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [newShowtime, setNewShowtime] = useState({ date: "", time: "" });
  const [showAddRow, setShowAddRow] = useState(false)
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(
          `${SERVERIP}/movie/${movieIdParam}/showtimes`
        );
        setShowtimes(response.data || []);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };
  
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`${SERVERIP}/movie/${movieIdParam}/trailer`);
        setTrailer(response.data || "");
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
  
    const params = new URLSearchParams(location.search);
    const movieIdParam = params.get("movieId");
    const posterParam = params.get("poster");
    if (movieIdParam && posterParam) {
      setMovieId(movieIdParam);
      setPoster(posterParam);
      fetchShowtimes();
      fetchTrailer();
    } else {
      navigate("/"); // Redirect to home page if movieId or poster is not provided
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get(
        `${SERVERIP}/movie/${movieId}/showtimes`
      );
      setShowtimes(response.data || []);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(`${SERVERIP}/movie/${movieId}/trailer`);
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
      await axios.post(`${SERVERIP}/movie/${movieId}/showtimes`, newShowtime);
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
      await axios.delete(
        `${SERVERIP}/movie/${movieId}/showtimes/${showtimeId}`
      );
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
    <div className="flex justify-center items-center min-h-screen bg-[#e5e8f0] font-monts">
      <div className="sm:w-[80%] max-sm:w-[90%] flex flex-col bg-white h-[90%] my-4 rounded-xl shadow-lg">
        <div className="sm:flex max-sm:flex-col justify-between">
          <div className="sm:w-[30%] max-sm:w-[95%] flex justify-center mt-2 ml-2">
            <img
              src={poster}
              className="rounded-md w-full h-[90%]"
              alt={poster}
            />
          </div>
          <div className="flex flex-col sm:w-[60%] max-sm:w-full gap-3 sm:mr-4 mt-4">
            <div className="flex justify-between mb-2 mr-2">
              <h2 className="text-2xl text-center font-bold w-full">
                Showtimes{" "}
              </h2>
              {(userType === "admin" || userType === "movievolunteer" || userType === "volunteer") && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-8 h-8"
                  onClick={handleAddShowtime}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </div>
            <table className="flex flex-col items-center mb-3">
              <thead className="flex justify-between sm:w-2/3 max-sm:w-[90%]">
                <tr className="flex justify-evenly gap-11 w-full text-lg">
                  <th>Date</th>
                  <th>Time</th>
                  {(userType === "admin" || userType === "volunteer"|| userType === "movievolunteer") && (
                    <th>Action</th>
                  )}
                </tr>
              </thead>

              <tbody className="flex flex-col justify-center sm:w-2/3 max-sm:w-[90%] gap-3 mt-3">
                {showtimes.map((showtime, index) => (
                  <tr
                    key={index}
                    className="flex justify-evenly w-full text-medium mr-6"
                  >
                    <td>{moment(showtime.date).format("DD-MM-YYYY")}</td>
                    <td className="pr-7">
                      {moment(showtime.time, "HH:mm").format("hh:mm A")}
                    </td>
                    {(userType === "admin" || userType === "volunteer" || userType === "movievolunteer") && (
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleDeleteShowtime(showtime._id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </td>
                    )}
                  </tr>
                ))}
                {showAddRow &&
                  (userType === "admin" || userType === "volunteer" || userType === "movievolunteer") && (
                    <tr className="flex justify-evenly w-full text-medium mr-6">
                      <td>
                        <input
                          type="date"
                          value={newShowtime.date}
                          onChange={(e) => handleChange(e, "date")}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          value={newShowtime.time}
                          onChange={(e) => handleChange(e, "time")}
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="green"
                          className="w-6 h-6"
                          onClick={handleSaveShowtime}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mb-3 w-full">
          <div className="flex sm:w-[90%] max-sm:w-[80%] max-sm:h-[40%]">
            {trailer && (
              <iframe
                title="movie-trailer"
                controls="false"
                width="1010"
                height="488"
                className="w-full"
                src={trailer}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        <div className="text-xl"> The Saturday morning showtime is arranged exclusively for Faculty/Staff, students are requested not to book seat in that slot.</div>
      </div>
    </div>
  );
};

export default Showtime;
