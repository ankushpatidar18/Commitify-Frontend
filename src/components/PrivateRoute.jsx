import useUserStore from '@/stores/useUserStore'
import React from 'react'
import Auth from './Auth'

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useUserStore()

    if(!isAuthenticated){
        return <Auth/>
    }

  return children
}

export default PrivateRoute
