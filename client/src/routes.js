import { INDEX_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, PROFILE_ROUTE } from "./utils/constants"
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

export const privateRoutes = [
    {
        path: PROFILE_ROUTE,
        component: Profile
    }
]

export const publicRoutes = [
    {
        path: INDEX_ROUTE,
        component: Index
    }
]

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Login
    },
    {
        path: REGISTER_ROUTE,
        component: Register
    }
]