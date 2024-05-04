import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { Link, useNavigate } from "react-router-dom";
import { SERVERIP } from "../config";

const Home = () => {
  const token = getToken();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

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
  };

  return (
    <div>
      <div className="bg-gray-200 flex flex-col items-center font-monts">
        <div className="flex flex-col items-between justify-center bg-white h-1/2 w-4/5 max-sm:w-[95%] my-10 rounded-xl shadow-lg">
          <div className="flex justify-between my-3 mx-5 max-sm:mx-2">
            <div>
              <h2 className="text-xl font-semibold">Ongoing Movies</h2>
            </div>
            {ongoingMovies.length > 4 && (
            <div className="flex justify-end">
              <p
                className="font-inter text-sm cursor-pointer"
                onClick={toggleShowMoreOngoing}
              >
                {showMoreOngoing ? "Show Less" : "Show More"}
              </p>
            </div>)}
          </div>
          <div className="grid gap-6 max-sm:gap-2 mb-8 max-sm:mb-4 max-sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5 max-sm:mx-2">
            {ongoingMovies.map((movie) => (
              <Link
                to={`/showtime/${movie._id}/${encodePosterUrl(movie.poster)}`}
                key={movie._id}
                onClick={() => console.log("Clicked movie ID:", movie._id)}
                className="flex items-center justify-center"
              >
                <div className="w-full h-full object-cover">
                  <div className="w-full h-4/5 max-sm:h-2/3">
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </div>
                  <div className="flex flex-col mt-1">
                    <p className="font-semibold text-2xl max-sm:text-lg">
                      {movie.title}
                    </p>
                    <p className="max-sm:text-sm">{movie.genre}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {upcomingMovies.length > 0 && (
          <div className="flex flex-col bg-white h-1/2 w-4/5 max-sm:w-[95%] my-10 rounded-xl shadow-lg">
            <div className="flex justify-between my-3 mx-5 max-sm:mx-2">
              <div>
                <h2 className="text-xl font-semibold">Upcoming Movies</h2>
              </div>
              <div className="flex justify-end">
                <p
                  className="font-inter text-sm cursor-pointer"
                  onClick={toggleShowMoreUpcoming}
                >
                  {showMoreUpcoming ? "Show Less" : "Show More"}
                </p>
              </div>
            </div>
            <div className="grid gap-6 max-sm:gap-2 mb-8 max-sm:mb-4 max-sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5 max-sm:mx-2">
              {upcomingMovies.map((movie) => (
                <Link
                  to={`/showtime/${movie._id}/${encodePosterUrl(movie.poster)}`}
                  key={movie._id}
                  onClick={() => console.log("Clicked movie ID:", movie._id)}
                  className="flex items-center justify-center"
                >
                  <div className="w-full h-full object-cover">
                    <div className="w-full h-4/5 max-sm:h-2/3">
                      <img
                        className="object-cover w-full h-full rounded-md"
                        src={movie.poster}
                        alt={movie.title}
                      />
                    </div>
                    <div className="flex flex-col mt-1">
                      <p className="font-semibold text-2xl max-sm:text-lg">
                        {movie.title}
                      </p>
                      <p className="max-sm:text-sm">{movie.genre}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
