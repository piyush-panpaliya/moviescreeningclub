/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ModifyMovie.css";

const ModifyMovie = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType === 'standard') {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/movie/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setEditedData({
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      currentscreening: movie.currentscreening,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/movie/movies/${editingMovie._id}`, editedData);
      setMovies(movies.map(movie => movie._id === editingMovie._id ? editedData : movie));
      setEditingMovie(null);
      setEditedData({});
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedData({
      ...editedData,
      [name]: newValue,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/movie/movies/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <h1>Movie List</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Poster</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Current Screening</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="title" 
                    value={editedData.title} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.title
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="poster" 
                    value={editedData.poster} 
                    onChange={handleChange} 
                  />
                ) : (
                  <img src={movie.poster} alt={movie.title} className="poster-image" />
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <textarea 
                    name="description" 
                    value={editedData.description} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.description
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="date" 
                    name="releaseDate" 
                    value={editedData.releaseDate} 
                    onChange={handleChange} 
                  />
                ) : (
                  new Date(movie.releaseDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="genre" 
                    value={editedData.genre} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="checkbox" 
                    name="currentscreening" 
                    checked={editedData.currentscreening} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.currentscreening ? "Yes" : "No"
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingMovie(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(movie)}>Edit</button>
                    <button onClick={() => handleDelete(movie._id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModifyMovie; */



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ModifyMovie.css";

const ModifyMovie = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingMovie, setAddingMovie] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType || userType === "standard") {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/movie/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setEditedData({
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      currentscreening: movie.currentscreening
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/movie/movies/${editingMovie._id}`,
        editedData
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === editingMovie._id ? editedData : movie
        )
      );
      setEditingMovie(null);
      setEditedData({});
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedData({
      ...editedData,
      [name]: newValue
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/movie/movies/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleAdd = () => {
    setAddingMovie(true);
  };

  const handleAddSave = async () => {
    try {
      const res = await axios.post("http://localhost:8000/movie/add-movies", editedData);
      console.log("Movie added:", res.data);
      setMovies([...movies, res.data]);
      setAddingMovie(false);
      setEditedData({});
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div>
      <h1>Movie List</h1>
      <button onClick={handleAdd}>Add Movie</button>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Poster</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Current Screening</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
                           <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="title" 
                    value={editedData.title} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.title
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="poster" 
                    value={editedData.poster} 
                    onChange={handleChange} 
                  />
                ) : (
                  <img src={movie.poster} alt={movie.title} className="poster-image" />
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <textarea 
                    name="description" 
                    value={editedData.description} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.description
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="date" 
                    name="releaseDate" 
                    value={editedData.releaseDate} 
                    onChange={handleChange} 
                  />
                ) : (
                  new Date(movie.releaseDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="text" 
                    name="genre" 
                    value={editedData.genre} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <input 
                    type="checkbox" 
                    name="currentscreening" 
                    checked={editedData.currentscreening} 
                    onChange={handleChange} 
                  />
                ) : (
                  movie.currentscreening ? "Yes" : "No"
                )}
              </td>
              <td>
                {editingMovie === movie ? (
                  <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingMovie(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(movie)}>Edit</button>
                    <button onClick={() => handleDelete(movie._id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {addingMovie && (
            <tr>
              <td>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editedData.title || ""}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="poster"
                  placeholder="Poster URL"
                  value={editedData.poster || ""}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={editedData.description || ""}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="releaseDate"
                  value={editedData.releaseDate || ""}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={editedData.genre || ""}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="currentscreening"
                  checked={editedData.currentscreening || false}
                  onChange={handleChange}
                />
              </td>
              <td>
                <button onClick={handleAddSave}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModifyMovie;




