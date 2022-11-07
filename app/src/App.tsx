import './App.css';

import React, { useState } from 'react';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
	const [isLogged, setLogged] = useState(false)
	const [data, setData] = useState()
	const handleIsLogged = (_data: any) => {
		setLogged(true)
		setData(_data)
	}
	return (
		<div className="App">
			{isLogged ? <Dashboard data={data} /> : <Login handleIsLogged={handleIsLogged} />}
		</div>
	)
}

export default App
