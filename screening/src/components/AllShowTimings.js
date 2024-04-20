import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // Import moment library for date and time formatting

const ShowtimePage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType) {
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

  const handleShowtimeSelection = (showtimeId, MovieTitle, date, time) => {
    navigate(
      `/seatmap/${showtimeId}?email=${email}&movie=${encodeURIComponent(
        MovieTitle
      )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`
    );
  };

  const columns = [
    {
      key: "movie",
      label: "MOVIE",
    },
    {
      key: "Showtime",
      label: "SHOWTIME",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  return (
    <div>
      <div>Access granted for {email}.</div>
      <h1>Please select a Showtime from below:</h1>
      {movies.length > 0 && (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {movies.map((movie) =>
              movie.showtimes.map((showtime, index) => (
                <TableRow key={`${movie._id}-${index}`}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>
                    {moment(showtime.date).format("DD-MM-YYYY")} -{" "}
                    {moment(showtime.time, "HH:mm").format("hh:mm A")}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        handleShowtimeSelection(
                          showtime._id,
                          movie.title,
                          showtime.date,
                          showtime.time
                        )
                      }
                    >
                      Select
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      {/* Render a second table */}
      <table className="w-[80%] bg-gray-200">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Showtime</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) =>
            movie.showtimes.map((showtime, index) => (
              <tr key={`${movie._id}-${index}`}>
                <td>{movie.title}</td>
                <td>
                  {moment(showtime.date).format("DD-MM-YYYY")} -{" "}
                  {moment(showtime.time, "HH:mm").format("hh:mm A")}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleShowtimeSelection(
                        showtime._id,
                        movie.title,
                        showtime.date,
                        showtime.time
                      )
                    }
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default ShowtimePage;
