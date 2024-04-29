import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userVotes, setUserVotes] = useState([]);
  const [newMovieData, setNewMovieData] = useState({
    title: "",
    poster: "",
    genre: ""
  });

  useEffect(() => {
    fetchMovies();
    const email = localStorage.getItem("loggedInUserEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8000/voterouter/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      const fetchedMovies = data.movies.map((movie) => {
        const voted = movie.voters.includes(userEmail);
        return { ...movie, voted };
      });
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const handleVoteClick = async (movieId, voteType) => {
    try {
      const response = await fetch("http://localhost:8000/voterouter/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          voteType,
          userEmail,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to record vote");
      }
      // Refresh movies after voting
      fetchMovies();
    } catch (error) {
      console.error("Error voting for movie:", error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const response = await fetch("http://localhost:8000/voterouter/addvotemovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovieData),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      // Clear the new movie data
      setNewMovieData({
        title: "",
        poster: "",
        genre: ""
      });
      // Refresh movies after adding
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8000/voterouter/deletevotemovie/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      // Refresh movies after deleting
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };
  const MovieCard = ({ movie }) => {
    // Calculate vote percentages
    const totalVotes = movie.yesCount + movie.noCount;
    const yesPercentage = totalVotes === 0 ? 0 : (movie.yesCount / totalVotes) * 100;
    const noPercentage = totalVotes === 0 ? 0 : (movie.noCount / totalVotes) * 100;
  
    // Conditionally render voting options based on whether the user has already voted for the movie
    return (
      <div className="flex bg-white rounded-lg shadow-md p-4 m-4 w-full relative">
        <div className="w-full h-full object-cover">
          <div className="w-48 h-auto mb-2 rounded mr-4">
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
  
        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-2">
            <div className="flex flex-row">
              <span className="font-semibold text-gray-600 px-2">Yes</span>
              <div className="bg-blue-200 h-8 rounded-xl w-40">
                <div
                  className="bg-blue-500 h-8 rounded-xl"
                  style={{ width: `${yesPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-row pt-2">
              <span className="font-semibold text-gray-600 px-2">No</span>
              <div className="bg-red-200 h-8 rounded-xl  w-40">
                <div
                  className="bg-red-500 h-8 rounded-xl"
                  style={{ width: `${noPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="absolute bottom-0 right-0">
          {!movie.voters.includes(userEmail) && (
            <div className="flex flex-col items-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                onClick={() => handleVoteClick(movie._id, "yes")}
              >
                Vote Yes
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleVoteClick(movie._id, "no")}
              >
                Vote No
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap gap-4 justify-evenly">
      {/* Render existing movies */}
      {movies.map((movie) => (
        <div key={movie._id} className="w-full  lg:w-1/3">
          <MovieCard movie={movie} />
          <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
        </div>
      ))}
      
      {/* Form to add new movie */}
      <div className="w-full lg:w-1/3">
        <h2>Add New Movie</h2>
        <input 
          type="text" 
          placeholder="Title" 
          value={newMovieData.title} 
          onChange={(e) => setNewMovieData({ ...newMovieData, title: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Poster URL" 
          value={newMovieData.poster} 
          onChange={(e) => setNewMovieData({ ...newMovieData, poster: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Genre" 
          value={newMovieData.genre} 
          onChange={(e) => setNewMovieData({ ...newMovieData, genre: e.target.value })} 
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
    </div>
  );
};

export default MovieList;
