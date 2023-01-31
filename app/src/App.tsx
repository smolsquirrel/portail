import './App.css';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { inject } from '@vercel/analytics';

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import SimpleDashboard from './components/SimpleDashboard';

inject()
function App() {
	const [isLogged, setLogged] = useState(false)
	const [isLoaded, setLoaded] = useState(false)

	const [data, setData] = useState()
	const [semester, setSemester] = useState("")
	const handleIsLogged = (_data: any) => {
		setLogged(true)
		setSemester(_data["default"])
		setData(_data["data"])
	}

	const handleLoaded = (_data: any) => {
		setData(_data)
		setLoaded(true)
	}
	return (
		<Box className="App">
			<Navbar />
			{isLogged ? (
				isLoaded ? (
					<Dashboard
						data={data}
						semester={semester}
						setSemester={setSemester}
						loaded={isLoaded}
					/>
				) : (
					<SimpleDashboard
						data={data}
						semester={semester}
						setSemester={setSemester}
						loaded={isLoaded}
					/>
				)
			) : (
				<Box display="flex" justifyContent="center" alignItems="center" height="90vh">
					<LoginForm handleIsLogged={handleIsLogged} handleLoaded={handleLoaded} />
				</Box>
			)}
		</Box>
	)
}

export default App
