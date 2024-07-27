import { Loading } from '@/components/icons/Loading'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'

const Metrics = () => {
  const [data, setCounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await api.get(`/metrics/${year}/${month}`)
        if (response.status !== 200) {
          setError('Failed to fetch designation data.')
          setLoading(false)
          return
        }
        console.log(response.data)
        setCounts(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch designation data.')
        setLoading(false)
      }
    }

    fetchCounts()
  }, [month, year])

  if (loading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <div className="designation-data p-4 w-full text-center flex flex-col gap-4">
      <p className="text-xl font-bn sm:text-4xl font-bold ">
        Memberships Sold for {month}/{year}
      </p>
      <div className="flex items-center gap-2">
        <label>
          Month:
          <select
            value={month}
            className="px-4 py-1 rounded-lg ml-1 dark:bg-[#212121]"
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select
            value={year}
            className="px-4 py-1 rounded-lg ml-1 dark:bg-[#212121]"
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="bg-white dark:bg-[#141414] rounded-lg  p-4 shadow-xl min-w-full w-fit">
          <p>
            <strong> Memberships Sold:</strong>
            {data.count}
          </p>
          <p className="mb-10">
            <strong>Total Amount Collected:</strong> {data.totalAmount}
          </p>
          <table className="w-full">
            <thead className="bg-neutral-400 dark:bg-[#323232] capitalize max-sm:text-xs">
              <tr>
                <th className="px-3 py-1">Membership Type</th>
                <th className="px-3 py-1">Count</th>
                <th className="px-3 py-1">Amount</th>
                <th className="px-3 py-1">B-tech</th>
                <th className="px-3 py-1">M-tech/Phd</th>
                <th className="px-3 py-1">Faculty/Staff</th>
                <th className="px-3 py-1">Other</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.byMembership).map(
                ([memtype, memdata], i) => (
                  <tr
                    className="odd:bg-neutral-200 dark:odd:bg-neutral-900 even:bg-neutral-100 dark:even:bg-neutral-800"
                    key={i}
                  >
                    <td className="text-center">{memtype}</td>
                    <td className="text-center">{memdata.count}</td>
                    <td className="text-center">{memdata.totalAmount}</td>
                    {Object.entries(memdata.memtypeCounts).map(
                      ([designation, count]) => (
                        <td
                          key={`${memtype}-${designation}`}
                          className="text-center"
                        >
                          {count || 0}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Metrics
