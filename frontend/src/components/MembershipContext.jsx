import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLogin } from '@/components/LoginContext'
import { api } from '@/utils/api'
const MembershipContext = createContext()

export const useMembershipContext = () => useContext(MembershipContext)

export const MembershipProvider = ({ children }) => {
  const { user } = useLogin()
  const [hasMembership, setHasMembership] = useState(false)
  const [memberships, setMemberships] = useState(null)
  useEffect(() => {
    checkMembershipStatus()
  }, [user])

  const checkMembershipStatus = async (resp) => {
    if (!user) {
      setHasMembership(false)
      return
    }
    if (resp) {
      setHasMembership(resp.hasMembership)
      setMemberships(resp.memberships)
      return
    }
    try {
      const res = await api.get('/membership/check')

      if (res.status === 200) {
        setHasMembership(res.data.hasMembership)
        setMemberships(res.data.memberships)
      } else {
        setHasMembership(false)
      }
    } catch {
      setHasMembership(false)
    }
  }

  return (
    <MembershipContext.Provider
      value={{ hasMembership, checkMembershipStatus, memberships }}
    >
      {children}
    </MembershipContext.Provider>
  )
}
