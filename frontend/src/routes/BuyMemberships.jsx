import { useState, useEffect } from 'react'
import { useMembershipContext } from '@/components/MembershipContext'
import { useLogin } from '@/components/LoginContext'
import { Navigate } from 'react-router-dom'
import { api } from '@/utils/api'
import Swal from 'sweetalert2'
import { Button, user } from '@nextui-org/react'
import { memData } from '@/constants/memberships'
import { getUserType } from '@/utils/user'

const BuyMemberships = () => {
  const { user } = useLogin()
  const { hasMembership, checkMembershipStatus } = useMembershipContext()
  const [loading, setLoading] = useState(false)
  const userDesignation = getUserType(user.email)
  if (hasMembership) {
    return <Navigate to="/tickets" />
  }

  const memberships = memData.map((mem) => ({
    name: mem.name,
    validitydate: Date.now() + mem.validity * 1000,
    availQR: mem.availQR,
    price: mem.price.find((p) => p.type === userDesignation).price
  }))
  const colors = ['red', 'gray', 'amber', 'blue']
  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen font-monts pb-3">
      <div className="flex flex-col  items-center lg:w-[90%] h-[95%] border rounded-md">
        <h2 className="text-3xl text-center font-bold mt-4">
          {loading ? 'Choosing...' : 'Choose Your Plan'}
        </h2>

        <div className="hidden bg-gradient-to-bl from-red-400 to-red-100"></div>
        <div className="hidden bg-gradient-to-bl from-gray-400 to-gray-100"></div>
        <div className="hidden bg-gradient-to-bl from-amber-400 to-amber-100"></div>
        <div className="hidden bg-gradient-to-bl from-blue-400 to-blue-100"></div>

        <div className="flex flex-wrap gap-4  items-center pt-10">
          {memberships.map((mem, index) => (
            <div
              key={index}
              disabled={loading}
              onClick={async () => {
                try {
                  if (loading) return
                  setLoading(true)
                  const res = await api.post('/membership/request', {
                    memtype: mem.name
                  })
                  setLoading(false)
                  if (res.status !== 200) {
                    console.error(
                      'Error requesting membership:',
                      res.data.error
                    )
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
              }}
              className={`bg-gradient-to-bl from-${colors[index]}-400 to-${colors[index]}-100 w-fit max-sm:w-[90%] border-2 border-gray-200 hover:border-2 hover:border-[#332941] rounded-lg flex flex-col justify-around gap-5 mt-10 px-4 py-10  hover:scale-110 transition-transform duration-300`}
            >
              <div className="flex justify-evenly ">
                <div className="flex flex-col justify-between items-center ">
                  <span className="text-2xl mt-2 font-semibold uppercase ">
                    {mem.name}
                  </span>
                  <span className="text-lg mt-2 font-md">Subscription</span>
                </div>
              </div>
              <div className="flex justify-center mt-6 ">
                <ul className="flex flex-col gap-2 w-[90%]">
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span>{mem.availQR} Passes</span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Price: </p>
                      <p className="text-xl ml-2 font-semibold">₹{mem.price}</p>
                    </span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Valid till: </p>
                      <p className="text-lg ml-2 font-semibold">
                        {new Date(mem.validitydate).toLocaleDateString('en-IN')}
                      </p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BuyMemberships
