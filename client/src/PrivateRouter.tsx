import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context/admin/authContext/AuthContext'

const PrivateRoutes:React.FC = () => {
    const {state} = useContext(AuthContext)
  const isAdmin = state.user.isAdmin

  return isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoutes