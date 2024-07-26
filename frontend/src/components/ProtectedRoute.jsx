import { useLogin } from '@/components/LoginContext'
import { isAllowedLvl } from '@/utils/levelCheck'
import { Navigate, useLocation } from 'react-router-dom'
const AuthenticatedRoute = ({ children, minLevel = 'standard' }) => {
  const { loggedIn, user } = useLogin()
  const location = useLocation()
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  if (!isAllowedLvl(minLevel, user?.usertype)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AuthenticatedRoute
