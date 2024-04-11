import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import Logo from '../images/logo.png';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/movie/movies")
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // Filter ongoing and upcoming movies
  const ongoingMovies = movies.filter(movie => movie.currentscreening);
  const upcomingMovies = movies.filter(movie => !movie.currentscreening).slice(0, 4); // Display up to 4 upcoming movies

  return (
    <>
      <div>
       

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Ongoing Movies</h2>
          <div className="flex overflow-x-auto">
            {ongoingMovies.map((movie) => (
              <Link
                to={`/showtime/${movie._id}`}
                key={movie._id}
                onClick={() => console.log('Clicked movie ID:', movie._id)} // Add onClick event handler
                className="flex-shrink-0 w-64 mr-4"
              >
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  <img className="w-full mb-2 rounded" src={movie.poster} alt={movie.title} />
                  <div>
                    <p className="text-lg font-semibold">{movie.title}</p>
                    <p className="text-gray-600">{movie.genre}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <hr className="my-8 border-t" />

          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
            <div className="flex overflow-x-auto">
              {upcomingMovies.map((movie) => (
                <Link to={`/showtime/${movie._id}`} key={movie._id} className="flex-shrink-0 w-64 mr-4">
                  <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <img className="w-full mb-2 rounded" src={movie.poster} alt={movie.title} />
                    <div>
                      <p className="text-lg font-semibold">{movie.title}</p>
                      <p className="text-gray-600">{movie.genre}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer bg-gray-800 text-white py-8">
        <div className="container mx-auto flex justify-between items-center">
          <img className="h-8 w-auto" src={Logo} alt="Movies" />
          <div className="flex space-x-4">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
