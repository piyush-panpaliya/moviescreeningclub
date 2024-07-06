import { useEffect, useState } from 'react'
import { useLogin } from '@/components/LoginContext'
import { api } from '@/utils/api'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Tickets = () => {
  const { user } = useLogin()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [tickets, setTickets] = useState({
    used: [],
    unused: [],
    expired: []
  })

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const res = await api.get('/qr')
      console.log(res.data)
      setTickets(res.data.qrCodes)
    } catch {
      console.log('error')
      navigate('/')
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchTickets()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-8 ">
      <p className="text-xl sm:text-5xl font-bold w-full text-center">
        Tickets
      </p>
      {tickets.unused.length === 0 &&
        tickets.used.length === 0 &&
        tickets.expired.length === 0 && (
          <p className="text-xl w-full mb-10 text-center h-[50vh]">
            No tickets found
          </p>
        )}
      {tickets.unused.length > 0 && (
        <div className="flex flex-col gap-6">
          <p className="text-xl sm:text-2xl font-bold">Upcoming Tickets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.unused.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => {
                  Swal.fire({
                    html: `<div className="flex flex-col items-center" style="flex-direction: column;display:flex;align-items: center" ><p><span style="font-weight: 600;">${ticket.movie.title}</span> - ${new Date(
                      ticket.movie.showtime.date
                    ).toLocaleString(
                      'en-IN'
                    )} - ${ticket.seat}</p><img src=${ticket.qrData} alt="qr code" style="height:40vh;width:40vh" />`,

                    icon: 'info'
                  })
                }}
                className="bg-white shadow-md p-4 rounded-lg flex flex-col sm:flex-row items-center gap-3"
              >
                <img src={ticket.qrData} alt="qr code" className="w-36 h-36 " />
                <div className=" flex flex-col gap-1">
                  <p className="text-lg font-bold">{ticket.movie.title}</p>
                  <p>
                    {new Date(ticket.movie.showtime.date).toLocaleString(
                      'en-IN',
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      }
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Seat: </span>
                    {ticket.seat}
                  </p>
                  <p className="text-xs">
                    {' '}
                    <span className="font-semibold">Purchase Date: </span>
                    {new Date(ticket.registrationDate).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </p>
                  <p className="text-xs">
                    {' '}
                    <span className="font-semibold">Expiration Date: </span>
                    {new Date(ticket.expirationDate).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tickets.used.length > 0 && (
        <div className="flex flex-col gap-6">
          <p className="text-xl sm:text-2xl font-bold">Used Tickets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.used.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gray-400 shadow-md p-4 rounded-lg flex flex-col gap-2"
              >
                <p>
                  <span className="font-semibold">Seat: </span>
                  {ticket.seat}
                </p>
                <p>
                  {' '}
                  <span className="font-semibold">Purchase Date: </span>
                  {new Date(ticket.registrationDate).toLocaleString('en-IN')}
                </p>
                <p>
                  {' '}
                  <span className="font-semibold">Expiration Date: </span>
                  {new Date(ticket.expirationDate).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {tickets.expired.length > 0 && (
        <div className="flex flex-col gap-6">
          <p className="text-xl sm:text-2xl font-bold">Expired Tickets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.expired.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gray-400 shadow-md p-4 rounded-lg flex flex-col gap-2"
              >
                <p>
                  <span className="font-semibold">Seat: </span>
                  {ticket.seat}
                </p>
                <p>
                  {' '}
                  <span className="font-semibold">Purchase Date: </span>
                  {new Date(ticket.registrationDate).toLocaleString('en-IN')}
                </p>
                <p>
                  {' '}
                  <span className="font-semibold">Expiration Date: </span>
                  {new Date(ticket.expirationDate).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tickets
