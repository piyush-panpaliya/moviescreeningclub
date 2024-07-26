import { useMembershipContext } from '@/components/MembershipContext'
import MoieCard from '@/components/MovieCard'
import { api } from '@/utils/api'
import useDeviceSize from '@/utils/useDeviceSize'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GrpCard = ({ type, movies }) => {
  const [showMore, setShowMore] = useState(false)
  const deviceSize = useDeviceSize()
  const scrollToElement = (elementId, additionalOffset = 0) => {
    const element = document.getElementById(elementId)
    if (!element) return
    const elementPosition = element.offsetTop - additionalOffset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
  const limit = ['xs', 'sm'].includes(deviceSize)
    ? 2
    : ['md', 'lg'].includes(deviceSize)
      ? 3
      : 4
  return (
    <div id={type} className="flex w-4/5 flex-col gap-2">
      <p className="font-bn text-2xl text-[#E40C2B]">{type}</p>
      <div className="grid grid-cols-2 gap-4 rounded-xl bg-white dark:bg-[#212121] p-4 sm:gap-6 sm:p-6 md:grid-cols-3 xl:grid-cols-4">
        {movies.slice(0, showMore ? movies.length : limit).map((movie, i) => (
          <MoieCard movie={movie} key={i} navigate />
        ))}
      </div>
      {movies.length > limit && (
        <p
          className="font-inter cursor-pointer text-center text-sm"
          onClick={() => {
            setShowMore(!showMore)
            showMore && scrollToElement(type, 120)
          }}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </p>
      )}
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { checkMembershipStatus } = useMembershipContext()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    api
      .get(`/movie`)
      .then((response) => {
        setMovies(response.data)
      })
      .catch((error) => {
        console.error('Error fetching movies:', error)
      })
  }, [])

  const ongoingMovies = movies.filter((movie) => movie?.currentscreening)
  const upcomingMovies = movies.filter((movie) => !movie?.currentscreening)

  return (
    <div className="flex flex-col items-center gap-6">
      {ongoingMovies.length > 0 && (
        <GrpCard type="Ongoing Movies" movies={ongoingMovies} />
      )}
      {upcomingMovies.length > 0 && (
        <GrpCard type="Upcoming Movies" movies={upcomingMovies} />
      )}
    </div>
  )
}

export default Home
