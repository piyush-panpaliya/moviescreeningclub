import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMembershipContext } from '@/components/MembershipContext'
import { api } from '@/utils/api'
import { useLogin } from '@/components/LoginContext'

const Myaccount = () => {
  const { loggedIn } = useLogin()
  const { hasMembership, checkMembershipStatus, memberships } =
    useMembershipContext()
  const navigate = useNavigate()
  const [previousMemberships, setPreviousMemberships] = useState([])
  const [currentMembership, setCurrentMembership] = useState(null)

  useEffect(() => {
    if (memberships) {
      setCurrentMembership(
        memberships.filter((membership) => membership.isValid)[0]
      )
      setPreviousMemberships(
        memberships.filter((membership) => !membership.isValid)
      )
      console.log('memberships:', memberships)
    }
  }, [memberships])
  const getColor = (memType) => {
    switch (memType.toLowerCase()) {
      case 'gold':
        return 'bg-gradient-to-t from-yellow-100 to-yellow-200'
      case 'silver':
        return 'bg-gradient-to-t from-gray-300 to-gray-400'
      case 'base':
        return 'bg-gradient-to-t from-orange-100 to-orange-300'
      default:
        return 'bg-gradient-to-t from-blue-200 to-blue-300'
    }
  }

  const suspendMembership = async () => {
    try {
      const res = await api.put(`/membership/suspend`, {
        id: currentMembership._id
      })
      if (res.status === 200) {
        checkMembershipStatus()
      }
    } catch (error) {
      console.error('Error suspending membership:', error)
    }
  }

  const toTitleCase = (str) => {
    return str.replace(/\b\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  if (!memberships) {
    return (
      <div className="h-[70vh] w-full text-center align-middle">Loading...</div>
    )
  }
  return (
    <div>
      <div className="bg-gray-200 flex flex-col items-center min-h-screen font-monts">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 mt-7">
          Your Memberships
        </h2>
        <div className="flex flex-col items-start w-4/5 max-sm:w-[90%] my-10 max-sm:my-4">
          <div className="flex flex-col w-full justify-start my-3 mx-5 max-sm:mx-2 ">
            <h3 className="text-xl lg:text-2xl font-semibold mb-2">
              Active Memberships
            </h3>
            <div className="flex gap-6 my-4 flex-wrap">
              {currentMembership && (
                <Link className="object-cover">
                  <div className="flex flex-col py-3 px-3 justify-center bg-white rounded-lg">
                    <div
                      className={`rounded-md ${getColor(
                        currentMembership.memtype
                      )} text-center w-[230px] lg:w-[250px] h-[280px] max-sm:h-[200px] mb-5`}
                      // style={getCardStyle(230, 180)}
                    >
                      <p>
                        <strong className="lg:text-lg">Purchase Date -</strong>{' '}
                        {new Date(
                          currentMembership.purchasedate
                        ).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                      {toTitleCase(currentMembership.memtype)}
                    </h3>
                    <p className="flex capitalize">
                      Validity till :{' '}
                      {new Date(
                        currentMembership.validitydate
                      ).toLocaleDateString('en-IN')}
                    </p>
                    <p className="flex capitalize">
                      Passes Left : {currentMembership.availQR}
                    </p>
                  </div>
                </Link>
              )}
            </div>
            {currentMembership && (
              <button
                onClick={suspendMembership}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-48 mt-8 ml-9 rounded"
              >
                Suspend Current Membership
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-4/5 max-sm:w-[90%] my-10 max-sm:my-4 font-monts">
          <div className="flex flex-col w-full justify-start my-3 mx-5 max-sm:mx-2 ">
            <h3 className="text-xl lg:text-2xl font-semibold mb-2">
              Previous Memberships
            </h3>
            <div className="flex gap-6 my-4 flex-wrap">
              {previousMemberships.map((membership, index) => (
                <div
                  key={index}
                  className="flex flex-col py-3 px-3 justify-center bg-white rounded-lg"
                >
                  <div
                    className={`rounded-md ${getColor(
                      membership.memtype
                    )} text-center w-[230px] lg:w-[250px] h-[280px] max-sm:h-[200px] mb-5`}
                    // style={getCardStyle(150, 180)}
                  ></div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                    {toTitleCase(membership.memtype)}
                  </h3>
                  <p>
                    <strong className="lg:text-lg">Purchase Date -</strong>{' '}
                    {new Date(membership.purchasedate).toLocaleDateString(
                      'en-IN'
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Myaccount
