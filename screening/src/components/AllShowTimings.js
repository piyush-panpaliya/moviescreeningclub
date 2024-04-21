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
const SERVERIP = "http://14.139.34.10:8000";

const ShowtimePage = () => {
  const { paymentId } = useParams();
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
        window.location.href = "/QR";
      }, 0);
    }
  }, [paymentId]);

  useEffect(() => {
    axios
      .get(`${SERVERIP}/movie/movies`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleShowtimeSelection = (showtimeId, MovieTitle, date, time) => {
    navigate(
      `/seatmap/${showtimeId}?paymentId=${paymentId}&movie=${encodeURIComponent(
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
    </div>
  );
  
};

export default ShowtimePage;
