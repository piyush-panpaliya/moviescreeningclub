import React, { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { useNavigate } from 'react-router-dom'
import MovieCard from '@/components/MovieCard'
const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    description: '',
    releaseDate: '',
    genre: '',
    currentscreening: true
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === 'currentscreening') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value === 'Ongoing'
      })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .post(`/movie/add`, formData)
      .then((res) => {
        setFormData({
          title: '',
          poster: '',
          description: '',
          releaseDate: '',
          genre: '',
          currentscreening: true // Reset to default value
        })
      })
      .catch((err) => console.error(err))
    navigate('/home')
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:gap-6 sm:p-6">
      <p className="font-bn text-2xl text-[#E40C2B] sm:text-4xl">
        Add a New Movie
      </p>
      <div className="grid grid-cols-3 items-start gap-4 p-4 sm:gap-6 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="align-end col-span-2 flex w-full flex-col items-center gap-4 overflow-auto rounded-3xl bg-[#212121] p-4 shadow-lg sm:gap-6 sm:p-6"
        >
          <label
            htmlFor="title"
            className="form-label flex w-full flex-col justify-between"
          >
            Title:
            <input
              type="text"
              className="min-w-[200px] rounded-lg border-none bg-[#141414] px-4 py-2 sm:max-w-[300px]"
              placeholder="enter movie title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label
            htmlFor="poster"
            className="form-label flex w-full flex-col justify-between"
          >
            Poster URL:
            <input
              type="text"
              className="min-w-[200px] rounded-lg border border-none bg-[#141414] px-4 py-2 sm:max-w-[400px]"
              placeholder="enter poster url"
              id="poster"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              required
            />
          </label>
          <label
            htmlFor="description"
            className="form-label flex w-full flex-col justify-between"
          >
            Description:
            <textarea
              id="description"
              className="min-w-[200px] rounded-lg border border-none bg-[#141414] px-4 py-2 sm:max-w-[300px]"
              placeholder="enter movie description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label
            className="form-label flex w-full flex-col justify-between"
            htmlFor="releaseDate"
          >
            Release Date:
            <input
              type="date"
              className="min-w-[200px] rounded-lg border border-none bg-[#141414] px-4 py-2 sm:max-w-[300px]"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </label>{' '}
          <label
            htmlFor="genre"
            className="form-label flex w-full flex-col justify-between"
          >
            Genre:
            <input
              type="text"
              className="min-w-[200px] rounded-lg border border-none bg-[#141414] px-4 py-2 sm:max-w-[300px]"
              placeholder="enter movie genre"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </label>
          <label
            htmlFor="currentscreening"
            className="form-label flex w-full flex-col justify-between"
          >
            Current Screening:
            <select
              id="currentscreening"
              className="min-w-[200px] rounded-lg border border-none bg-[#141414] px-4 py-2 sm:max-w-[300px]"
              name="currentscreening"
              value={formData.currentscreening ? 'Ongoing' : 'Upcoming'}
              onChange={handleChange}
              required
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </label>
          <button
            type="submit"
            className="my-4 rounded-xl bg-[#E40C2B] px-8 py-2 font-bold"
          >
            Add Movie
          </button>
        </form>
        <div className="sm:w-3/4">
          <MovieCard
            movie={{
              _id: '1',
              title: formData.title,
              poster: formData.poster,
              genre: formData.genre
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MovieForm
