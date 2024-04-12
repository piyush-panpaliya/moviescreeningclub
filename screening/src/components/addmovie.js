import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    //id: '',
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
      navigate('/');
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
    <div className='container w-75'>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Movie Information</legend>
          <div>
            <label htmlFor="title" className='form-label'>Title:</label>
            <input type="text" className='form-control' id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="poster" className='form-label'>Poster URL:</label>
            <input type="text" className='form-control' id="poster" name="poster" value={formData.poster} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description" className='form-label'>Description:</label>
            <textarea id="description" className='form-control' name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="releaseDate">Release Date:</label>
            <input type="date" className='form-control-lg' id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="genre" className='form-label'>Genre:</label>
            <input type="text" className='form-control' id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="currentscreening" className='form-label'>Current Screening:</label>
            <select id="currentscreening" className='form-select'  name="currentscreening" value={formData.currentscreening ? 'Ongoing' : 'Upcoming'} onChange={handleChange} required>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </fieldset>
        <p></p>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
