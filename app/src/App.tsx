import './App.css';

import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
	const [isLogged, setLogged] = useState(false)
	const [data, setData] = useState()
	const [semester, setSemester] = useState("")
	const handleIsLogged = (_data: any) => {
		setLogged(true)
		setSemester(_data["default"])
		setData(_data)
	}
	return (
		<Box className="App">
			{isLogged ? (
				<Dashboard data={data} semester={semester} setSemester={setSemester} />
			) : (
				<Login handleIsLogged={handleIsLogged} />
			)}
		</Box>
	)
}

export default App
