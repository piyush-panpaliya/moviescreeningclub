import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./home.css";
import Logo from "../images/logo.png";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [click,setclick]=useState([]);

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
    .slice(0, 4); // Display up to 4 upcoming movies
  console.log(ongoingMovies);

  return (
    <>
      <div>
        <div className="bg-gray-200 flex flex-col items-center">
          <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
            <div className="flex justify-between my-3 mx-5">
              <h2 className="text-xl font-semibold">Ongoing Movies</h2>
              <p>show more</p>
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mx-5">
              {/* <div className="rounded overflow-hidden bg-gray-400"> */}
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
                    />
                    </div>
                    <div className="flex flex-col mt-1 ">
                        <p className="font-semibold text-2xl">{movie.title}</p>
                        <p className="movie-genre">{movie.genre}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {/* </div> */}
            </div>
          </div>

          <div className="container">
            <h2>Upcoming Movies</h2>
            <div className="overflow-x-scroll">
              <div className="movie-list">
                {upcomingMovies.map((movie) => (
                  <Link to={`/showtime/${movie._id}`} key={movie._id}>
                    <div className="movie-card">
                      {" "}
                      {/* movie-card div should be inside the Link */}
                      <img src={movie.poster} alt={movie.title} />
                      <div className="movie-details">
                        <p className="movie-title">{movie.title}</p>
                        <p className="movie-genre">{movie.genre}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <img src="logo.png" alt="" />
        <div className="icon">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>
      </div>
    </>
  );
};

export default Home;
