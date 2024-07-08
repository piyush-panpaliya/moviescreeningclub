import Seats from '@/components/Seats'
import { useMembershipContext } from '@/components/MembershipContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { rows } from '@/utils/seats'
import { api } from '@/utils/api'
import { useLogin } from '@/components/LoginContext'
import { isAllowedLvl } from '@/utils/levelCheck'
// const contructSeats = () => {
//   let seats = []
//   for (let row of rows) {
//     for (let i = 1; i <= row.count; i++) {
//       const adder =
//         ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].indexOf(row.prefix) === -1
//           ? 3
//           : 0
//       seats.push({
//         name: `${row.prefix}${i}`,
//         sec: (i <= row.left ? 1 : i <= row.left + row.center ? 2 : 3) + adder,
//         occupied: false,
//         selected: false
//       })
//     }
//   }
//   return seats
// }

const Movie = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useLogin()
  const { hasMembership, memberships, checkMembershipStatus } =
    useMembershipContext()
  const [seats, setSeats] = useState(null)
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showtime, setShowtime] = useState(null)
  const movieId = new URLSearchParams(location.search).get('movieId')

  const fetchSeats = async (showtimeId) => {
    const res = await api.get(`/seatmap/${showtimeId}`)
    setSeats(res.data)
  }
  useEffect(() => {
    if (!hasMembership) {
      navigate('/buy')
    }
  }, [memberships])
  useEffect(() => {
    ;(async () => {
      const res = await api.get(`/movie/${movieId}`)
      if (res.status !== 200) {
        navigate('/')
      }
      setMovie(res.data)
      if (res.data.showtimes.length) {
        fetchSeats(res.data.showtimes[0]._id)
        setShowtime(res.data.showtimes[0]._id)
      }
    })()
  }, [])
  const maxAllowed =
    memberships.filter((membership) => membership.isValid)[0]?.availQR ?? 0
  const bookSeats = async () => {
    console.log(selectedSeats)
    try {
      setLoading(true)
      const res = await api.put(`/seatmap/${showtime}`, {
        seats: selectedSeats
      })
      if (res.status === 200) {
        checkMembershipStatus()
        navigate('/tickets')
      }
    } catch {
      if (res.status === 400) {
        alert(res.data.error)
      } else {
        alert('Something went wrong')
      }
    }
    setLoading(false)
  }
  if (!movie) {
    return <div>Loading...</div>
  }
  return (
    <div className="p-4 max-w-full flex flex-col items-center ">
      <p className="text-xl sm:text-3xl font-bold block sm:hidden mb-2">
        {movie?.title}
      </p>
      <div className="flex justify-between flex-col sm:flex-row w-full gap-4">
        <div className={`flex flex-col ${seats ? 'block' : 'hidden'}`}>
          <div>
            <span
              className={`bg-white-50 border border-green-600 bg-green-600 px-2 text-center cursor-pointer font-roboto text-10 mr-2`}
            ></span>
            <span className="text-md">Selected Seat</span>
          </div>
          <div>
            <span
              className={`seat bg-white-50 border border-red-400 bg-gray-300 px-2 text-center cursor-pointer font-roboto text-10 mr-2`}
            ></span>
            <span className="text-md">Seat Already Booked</span>
          </div>
          <div>
            <span
              className={`seat bg-white-50 border border-gray-400 px-2 text-center cursor-pointer font-roboto text-10 mr-2`}
            ></span>
            <span className="text-md">Seat Not Booked Yet</span>
          </div>
          <p className="text-sm mt-2 ">
            <span className="font-bold">Available Seats: </span> {maxAllowed}
          </p>
        </div>
        <p className="text-xl sm:text-3xl font-bold hidden sm:block">
          {movie?.title}
        </p>
        <div className="flex flex-col">
          <p className="font-bold mb-1">Showtimes available</p>
          {movie?.showtimes.map((showtime) => (
            <button
              key={showtime._id}
              onClick={() => {
                fetchSeats(showtime._id)
                setShowtime(showtime._id)
                setSelectedSeats([])
              }}
              className=" hover:underline rounded-md"
            >
              {new Date(showtime.date).toLocaleString('en-IN')}
            </button>
          ))}
          {isAllowedLvl('movievolunteer', user.usertype) && (
            <button
              onClick={() => {
                navigate('/showtime?movieId=' + movieId)
              }}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      {selectedSeats.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2  justify-between w-full z-10 drop-shadow-2xl fixed bottom-0 bg-white p-2 items-center sm:pr-8">
          {!!selectedSeats.length && (
            <p className="text-xl font-bold">
              Total: {selectedSeats.length || 0}
            </p>
          )}
          <p className="text-xl ">
            <span className="font-bold">Seats: </span>{' '}
            {selectedSeats.join(', ')}
          </p>
          <button
            onClick={bookSeats}
            className="bg-green-600 text-xl text-white p-2 rounded-md"
          >
            {loading ? 'Booking...' : 'Book'}
          </button>
        </div>
      )}
      <div className="scrollbar p-4 max-w-full h-screen overflow-auto flex  ">
        {seats && (
          <Seats
            seats={seats}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            maxAllowed={maxAllowed}
          />
        )}
      </div>
    </div>
  )
}

export default Movie
