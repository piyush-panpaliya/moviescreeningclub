/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    description: '',
    releaseDate: '',
    genre: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check userType in local storage on component mount
    const userType = localStorage.getItem('userType');
    if (!userType || userType === 'standard') {
      // If userType is not found or is "standard", redirect to the home page
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/movie/add-movies", formData)
      .then(res => {
        console.log('Movie added:', res.data);
        setFormData({
          title: '',
          poster: '',
          description: '',
          releaseDate: '',
          genre: '',
        });
      })
      .catch(err => console.error(err));
      navigate('/home');
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Movie Information</legend>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="poster">Poster URL:</label>
            <input type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="releaseDate">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
          </div>
        </fieldset>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    description: '',
    releaseDate: '',
    genre: '',
    currentscreening: true, // Default value
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check userType in local storage on component mount
    const userType = localStorage.getItem('userType');
    if (!userType || userType === 'standard') {
      // If userType is not found or is "standard", redirect to the home page
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = e => {
    if (e.target.name === 'currentscreening') {
      // Handle dropdown menu change separately
      setFormData({ ...formData, [e.target.name]: e.target.value === 'Ongoing' });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/movie/add-movies", formData)
      .then(res => {
        console.log('Movie added:', res.data);
        setFormData({
          title: '',
          poster: '',
          description: '',
          releaseDate: '',
          genre: '',
          currentscreening: true, // Reset to default value
        });
      })
      .catch(err => console.error(err));
      navigate('/home');
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Movie Information</legend>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="poster">Poster URL:</label>
            <input type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="releaseDate">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="currentscreening">Current Screening:</label>
            <select id="currentscreening" name="currentscreening" value={formData.currentscreening ? 'Ongoing' : 'Upcoming'} onChange={handleChange} required>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </fieldset>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
