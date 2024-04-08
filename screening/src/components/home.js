import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
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
  console.log(ongoingMovies);
  

  return (
    <><div>
      <nav className="fnav">
        <div className="left">
          <img src="logo.png" alt="" />
        </div>
        <div className="right">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

     

      <div className="container">
        <h2>Ongoing Movies</h2>
        <div className="overflow-x-scroll">
        <div className="movie-list ">
        {ongoingMovies.map((movie) => (
      
        <div className="movie-card">
          <img src={movie.poster} alt={movie.title} />
          <div className="movie-details">
            <p className="movie-title">{movie.title}</p>
            <p className="movie-genre">{movie.genre}</p>
          </div>
        </div>
          ))}
        </div>
        </div>
      

        <hr className="separator" />
        
          <div className="container ">
        <h2>Upcoming Movies</h2>
        <div className="overflow-x-scroll">
        <div className="movie-list">
          {upcomingMovies.map((movie, index) => (
            <div key={index} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-details">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-genre">{movie.genre}</p>
              </div>
            </div>
          ))}
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
    </div>
    
    </>
  );

          };
export default Home;
