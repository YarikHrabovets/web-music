import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { authentication } from './api/userApi'
import { Context } from './main'
import AppRouter from './components/AppRouter'
import Spinner from './components/ui/Spinner'

function App() {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		authentication()
		.then((data) => {
			setError(null)
			user.setIsAuth(true)
			user.setUser(data)
		})
		.catch((e) => {
			if (e.status !== 401) setError(e.response.data.message)
		})
		.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return (
			<div className='flex min-h-screen justify-center items-center'>
				<Spinner size='md' />
			</div>
		)
	}

	return (
    	<BrowserRouter>
			<AppRouter error={error} />
		</BrowserRouter>
	)
}

export default observer(App)