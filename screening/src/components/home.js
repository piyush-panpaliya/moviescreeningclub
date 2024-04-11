import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

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

  // Filter ongoing and upcoming movies
  const ongoingMovies = movies.filter((movie) => movie.currentscreening);
  const upcomingMovies = movies
    .filter((movie) => !movie.currentscreening)


    //.slice(0, 4); // Display up to 4 upcoming movies

  return (
    <>
      <div>
        <div className="bg-gray-200 flex flex-col items-center">
          <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
            <div className="flex justify-between my-3 mx-5">
              <h2 className="text-xl font-semibold">Ongoing Movies</h2>
              <p className="font-inter">Show More</p>
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mx-5">
              {ongoingMovies.map((movie) => (
                <Link
                  to={`/showtime/${movie._id}`}
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
                        style={{
                          objectFit: "cover",
                          transition: "visibility 0s ease 0s, opacity 0.3s linear 0s",
                          opacity: "1",
                          visibility: "visible",
                          maxWidth: "100%",
                          maxHeight: "100%"
                        }}
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

        <div className="bg-gray-200 flex flex-col items-center">
          <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
            <div className="flex justify-between my-3 mx-5">
              <h2 className="text-xl font-semibold">Upcoming Movies</h2>
              <p className="font-inter">Show More</p>
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mx-5">
              {upcomingMovies.map((movie) => (
                <Link
                  to={`/showtime/${movie._id}`}
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
                        style={{
                          objectFit: "cover",
                          transition: "visibility 0s ease 0s, opacity 0.3s linear 0s",
                          opacity: "1",
                          visibility: "visible",
                          maxWidth: "100%",
                          maxHeight: "100%"
                        }}
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
    </>
  );
};

export default Home;
