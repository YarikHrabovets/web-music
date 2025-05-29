import { createRoot } from 'react-dom/client'
import { createContext } from 'react'
import './index.css'
import App from './App.jsx'
import AppBackground from './components/appbackground/AppBackground'
import UserStore from './store/UserStore'
import MusicStore from './store/MusicStore.js'

const AppWithBackground = AppBackground(App)
export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        user: new UserStore(),
        music: new MusicStore()
    }}>
        <AppWithBackground />
    </Context.Provider>
)