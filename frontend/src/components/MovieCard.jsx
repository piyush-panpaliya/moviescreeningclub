import { Link } from 'react-router-dom'

const MoieCard = ({ movie, small = true, navigate = false, children }) => {
  const Container = navigate ? Link : 'div'
  const containerProps = navigate ? { to: `/movie?movieId=${movie._id}` } : {}

  return (
    <Container
      {...containerProps}
      className="flex h-full w-full flex-col justify-start gap-2 rounded-xl bg-[#0C0C0C] shadow-lg shadow-white/30"
    >
      <img
        className="w-full grow rounded-t-xl object-cover"
        src={movie.poster}
        alt={movie.title}
      />
      <div
        style={{
          maxHeight: small ? '120px' : 'auto'
        }}
        className="flex flex-col overflow-hidden p-4"
      >
        <p className="font-bn text-xl font-semibold max-sm:text-lg sm:text-2xl">
          {movie.title}
        </p>
        <p className="sm:text-md text-xs">{movie.genre}</p>
        {children}
      </div>
    </Container>
  )
}

export default MoieCard
