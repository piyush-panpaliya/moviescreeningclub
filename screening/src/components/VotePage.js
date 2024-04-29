import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userVotes, setUserVotes] = useState([]);

  useEffect(() => {
    fetchMovies();
    const email = localStorage.getItem("loggedInUserEmail");
    if (email) {
      setUserEmail(email);
    }
    console.log(email);
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

  const MovieCard = ({ movie }) => {
    // Calculate vote percentages
    const totalVotes = movie.yesCount + movie.noCount;
    const yesPercentage = totalVotes === 0 ? 0 : (movie.yesCount / totalVotes) * 100;
    const noPercentage = totalVotes === 0 ? 0 : (movie.noCount / totalVotes) * 100;
  
    // Conditionally render voting options based on whether the user has already voted for the movie
    return (
      <div className="flex items-start bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="w-full h-full object-cover">
          <div className="w-32 h-auto mb-2 rounded mr-4">
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
  
        <div className="flex flex-col items-center ml-auto">
          <div className="flex flex-col items-center mb-2">
            <div className="flex flex-row pt-20">
              <span className="font-semibold text-gray-600 px-2">Yes</span>
              <div className="bg-blue-200 h-8 w-96 rounded-xl">
                <div
                  className="bg-blue-500 h-8 rounded-xl"
                  style={{ width: `${yesPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-row pt-4">
              <span className="font-semibold text-gray-600 px-2">No</span>
              <div className="bg-red-200 h-8 w-96 rounded-xl">
                <div
                  className="bg-red-500 h-8 rounded-xl"
                  style={{ width: `${noPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            {!movie.voters.includes(userEmail) && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
