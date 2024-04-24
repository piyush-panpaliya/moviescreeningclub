import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVERIP } from "../config";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMoreOngoing, setShowMoreOngoing] = useState(false);
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

  const ongoingMovies = showMoreOngoing
    ? movies.filter((movie) => movie.currentscreening)
    : movies.filter((movie) => movie.currentscreening).slice(0, 4);

  const upcomingMovies = showMoreUpcoming
    ? movies.filter((movie) => !movie.currentscreening)
    : movies.filter((movie) => !movie.currentscreening).slice(0, 4);

  const toggleShowMoreUpcoming = () => {
    setShowMoreUpcoming(!showMoreUpcoming);
  };

  const toggleShowMoreOngoing = () => {
    setShowMoreOngoing(!showMoreOngoing);
  };

  // Function to encode the poster URL as a string
  const encodePosterUrl = (url) => {
    return encodeURIComponent(url);
    console.log(encodeURIComponent(url));
  };

  return (
    <div >
      <div className="bg-gray-200 flex flex-col items-center">
        <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
          <div className="flex justify-between my-3 mx-5">
            <h2 className="text-xl font-semibold">Ongoing Movies</h2>
            <p
              className="font-inter cursor-pointer"
              onClick={toggleShowMoreOngoing}
            >
              {showMoreOngoing ? "Show Less" : "Show More"}
            </p>
          </div>
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mx-5">
            {ongoingMovies.map((movie) => (
              <Link
                to={`/showtime/${movie._id}/${encodePosterUrl(movie.poster)}`} // Encode poster URL
                key={movie._id}
                onClick={() => console.log("Clicked movie ID:", movie._id)} // Add onClick event handler
                className="flex items-center justify-center"
              >
                <div className="w-full h-full object-cover">
                  <div className="w-full h-4/5">
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </div>
                  <div className="flex flex-col mt-1">
                    <p className="font-semibold text-2xl">{movie.title}</p>
                    <p className="movie-genre">{movie.genre}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
          <div className="flex justify-between my-3 mx-5">
            <h2 className="text-xl font-semibold">Upcoming Movies</h2>
            <p
              className="font-inter cursor-pointer"
              onClick={toggleShowMoreUpcoming}
            >
              {showMoreUpcoming ? "Show Less" : "Show More"}
            </p>
          </div>
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mx-5">
            {upcomingMovies.map((movie) => (
              <Link
                to={`/showtime/${movie._id}/${encodePosterUrl(movie.poster)}`} // Encode poster URL
                key={movie._id}
                onClick={() => console.log("Clicked movie ID:", movie._id)} // Add onClick event handler
                className="flex items-center justify-center"
              >
                <div className="w-full h-full object-cover">
                  <div className="w-full h-4/5">
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </div>
                  <div className="flex flex-col mt-1">
                    <p className="font-semibold text-2xl">{movie.title}</p>
                    <p className="movie-genre">{movie.genre}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
