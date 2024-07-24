import { useState, useEffect } from 'react'
import { useMembershipContext } from '@/components/MembershipContext'
import { useLogin } from '@/components/LoginContext'
import { Navigate } from 'react-router-dom'
import { api } from '@/utils/api'
import Swal from 'sweetalert2'
import { Button, user } from '@nextui-org/react'
import { memData } from '@constants/memberships'
import { getUserType } from '@/utils/user'
import { Star } from '@/components/icons/Buy'

const MembershipCard = ({ mem, loading, setLoading }) => {
  const buyMembership = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await api.post('/membership/request', {
        memtype: mem.name
      })
      setLoading(false)
      if (res.status !== 200) {
        console.error('Error requesting membership:', res.data.error)
        return
      }
      const options = {
        atomTokenId: res.data.atomTokenId,
        merchId: res.data.merchId,
        custEmail: user.email,
        custMobile: user.phone,
        returnUrl:
          (import.meta.env.VITE_environment === 'development'
            ? 'http://localhost:8000'
            : '/api') + '/membership/redirect'
      }
      let atom = new AtomPaynetz(options, 'uat')
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.error,
        icon: 'error'
      })
      setLoading(false)
    }
  }
  return (
    <div
      disabled={loading}
      onClick={buyMembership}
      className={`w-full bg-gradient-to-bl from-${mem.color}-400 to-${mem.color}-900 flex items-center justify-between gap-4 rounded-lg border-2 border-gray-900 px-4 py-8 transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:border-2 hover:border-[#332941] lg:gap-8`}
    >
      <div className="flex -rotate-90 transform flex-col items-center gap-1">
        <p className="text-2xl font-semibold uppercase">{mem.name}</p>
        <p className="font-md text-lg">Subscription</p>
      </div>
      <ul className="flex flex-col justify-center gap-2">
        <li className="flex items-center gap-2">
          <Star />
          <p>
            <span className="mr-1 text-lg font-semibold">{mem.availQR}</span>{' '}
            {mem.availQR > 1 ? 'Passes' : 'Pass'}
          </p>
        </li>
        <li className="flex items-center gap-2">
          <Star />
          <p>
            Price:
            <span className="ml-1 text-lg font-semibold">₹{mem.price}</span>
          </p>
        </li>
        <li className="flex items-center gap-2">
          <Star />
          <p>
            Valid till:
            <span className="ml-1 text-lg font-semibold">
              {new Date(mem.validitydate).toLocaleDateString('en-IN')}
            </span>
          </p>
        </li>
      </ul>
    </div>
  )
}

const BuyMemberships = () => {
  const { user } = useLogin()
  const { hasMembership, checkMembershipStatus } = useMembershipContext()
  const [loading, setLoading] = useState(false)
  const userDesignation = getUserType(user.email)
  if (hasMembership) {
    return <Navigate to="/tickets" />
  }
  const colors = ['red', 'gray', 'amber', 'blue']
  const memberships = memData.map((mem, i) => ({
    name: mem.name,
    validitydate: Date.now() + mem.validity * 1000,
    availQR: mem.availQR,
    price: mem.price.find((p) => p.type === userDesignation).price,
    color: colors[i]
  }))
  return (
    <div className="flex flex-col items-center justify-center p-4 font-monts sm:p-8">
      <h2 className="text-center font-bn text-2xl font-bold sm:text-4xl">
        {loading ? 'Choosing...' : 'Choose Your Plan'}
      </h2>

      <div className="hidden bg-gradient-to-bl from-red-400 to-red-900"></div>
      <div className="hidden bg-gradient-to-bl from-gray-400 to-gray-900"></div>
      <div className="hidden bg-gradient-to-bl from-amber-400 to-amber-900"></div>
      <div className="hidden bg-gradient-to-bl from-blue-400 to-blue-900"></div>
      <div className="hidden bg-gradient-to-bl from-red-400 to-red-100"></div>
      <div className="hidden bg-gradient-to-bl from-gray-400 to-gray-100"></div>
      <div className="hidden bg-gradient-to-bl from-amber-400 to-amber-100"></div>
      <div className="hidden bg-gradient-to-bl from-blue-400 to-blue-100"></div>

      <div className="grid grid-cols-1 items-center justify-items-center gap-4 pt-10 sm:grid-cols-2 2xl:grid-cols-4">
        {memberships.map((mem, index) => (
          <MembershipCard mem={mem} loading={loading} setLoading={setLoading} />
        ))}
      </div>
    </div>
  )
}

export default BuyMemberships
