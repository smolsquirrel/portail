import './App.css';

import React, { useState } from 'react';

import Login from './components/Login';

function App() {
	const [isLogged, setLogged] = useState(false)
	return (
		<div className="App">
			<Login />
		</div>
	)
}

export default App
