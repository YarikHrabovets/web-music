import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { INDEX_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../utils/constants'
import { authRoutes, publicRoutes, privateRoutes } from '../routes'
import { Context } from '../main'
import NavBar from './navbar/NavBar'
import Alert from '../components/ui/Alert'

function AppRouter({error}) {
    const { user } = useContext(Context)
    const currUrl = useLocation().pathname
    const isSetNav = currUrl !== LOGIN_ROUTE && currUrl !== REGISTER_ROUTE

    return (
        <>
            {isSetNav && <NavBar />}
            {error &&
				<div>
					<Alert status='error' message={error} />
				</div>
			}
            <Routes>
                {user.isAuth && privateRoutes.map(({path, component}) => 
                    <Route key={path} exact path={path} Component={component} />
                )}
                {publicRoutes.map(({path, component}) => 
                    <Route key={path} exact path={path} Component={component} />
                )}
                {!user.isAuth && authRoutes.map(({path, component}) =>
                    <Route key={path} exact path={path} Component={component} />
                )}
                <Route path='*' element={<Navigate to={INDEX_ROUTE} />} />
            </Routes>
        </>
    )
}

export default AppRouter
