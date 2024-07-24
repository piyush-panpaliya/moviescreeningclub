import { rows } from '@/utils/seats'
const Seat = ({ seat, selected, onclick }) => {
  return (
    <button
      className={`bg-white-50 font-roboto m-0.5 w-8 cursor-pointer border border-gray-400 px-1 py-1 text-center text-[8px] ${
        selected
          ? 'bg-green-600 text-white'
          : seat.occupied
            ? 'bg-gray-300 text-red-400'
            : ''
      }`}
      onClick={() => onclick(seat.name)}
      disabled={seat.occupied}
    >
      {seat.name}
    </button>
  )
}

const Seats = ({ seats, selectedSeats, setSelectedSeats, maxAllowed }) => {
  const handleSeatClick = (seatNo) => {
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNo))
    } else if (selectedSeats.length < maxAllowed) {
      setSelectedSeats([...selectedSeats, seatNo])
    } else {
      alert(`You can only select ${maxAllowed} seats`)
    }
  }
  const TopCenter = () => {
    const rowDivs = []
    let c = 0
    for (let row of rows) {
      if (!['Q', 'R', 'S', 'T'].includes(row.prefix)) {
        rowDivs.push(
          <div
            key={c}
            className="flex w-full flex-row-reverse justify-between px-12"
          >
            <div className="flex flex-row-reverse">
              {seats
                .filter(
                  (s) =>
                    s.name.includes(row.prefix) &&
                    s.sec == 5 &&
                    ['16', '17', '18'].includes(s.name.slice(1))
                )
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    occupied={false}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
            <div className="flex flex-row-reverse">
              {seats
                .filter(
                  (s) =>
                    s.name.includes(row.prefix) &&
                    s.sec == 5 &&
                    !['16', '17', '18'].includes(s.name.slice(1))
                )
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    occupied={false}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          </div>
        )
      } else {
        rowDivs.push(
          <div key={c} className="flex flex-row-reverse justify-center">
            {seats
              .filter((s) => s.name.includes(row.prefix) && s.sec == 5)
              .map((seat, i) => (
                <Seat
                  key={i}
                  seat={seat}
                  selected={selectedSeats.includes(seat.name)}
                  occupied={false}
                  onclick={handleSeatClick}
                />
              ))}
          </div>
        )
      }
      c++
    }

    return <div className="flex flex-col">{rowDivs}</div>
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl font-bold">Screen</p>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row-reverse">
              {seats
                .filter((s) => s.name.includes(row.prefix) && s.sec === 1)
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row-reverse">
              {seats
                .filter((s) => s.name.includes(row.prefix) && s.sec == 2)
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row-reverse">
              {seats
                .filter((s) => s.name.includes(row.prefix) && s.sec == 3)
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
      <p className="col-span-3 text-center text-lg font-bold">Entrance</p>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row-reverse">
              {seats
                .filter((s) => s.name.includes(row.prefix) && s.sec == 4)
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          ))}
        </div>
        <TopCenter />
        <div className="flex flex-col items-center">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row-reverse">
              {seats
                .filter((s) => s.name.includes(row.prefix) && s.sec == 6)
                .map((seat, i) => (
                  <Seat
                    key={i}
                    seat={seat}
                    selected={selectedSeats.includes(seat.name)}
                    onclick={handleSeatClick}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Seats
