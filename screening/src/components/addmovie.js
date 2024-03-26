import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    description: '',
    releaseDate: '',
    genre: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/add-movies", formData)
      .then(res => {
        console.log('Movie added:', res.data);
        // Optionally, reset the form after successful submission
        setFormData({
          title: '',
          poster: '',
          description: '',
          releaseDate: '',
          genre: '',
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Poster URL:</label>
          <input type="url" name="poster" value={formData.poster} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Release Date:</label>
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
