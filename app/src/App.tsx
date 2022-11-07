import './App.css';

import React, { useState } from 'react';

function App() {
	const API_URL = "https://hrb2ud.deta.dev/grades"
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState("")
	const [grade, setGrade] = useState<number | undefined>()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading("Loading")
		fetch(API_URL, {
			method: "post",
			body: JSON.stringify({ username: username, password: password }),
		})
			.then((r) => r.json())
			.then((data) => {
				setGrade(data["user"])
				setLoading("so bad")
			})
	}
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}
	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">uSernam</label>
				<input
					type="text"
					autoComplete="username"
					id="username"
					name="username"
					value={username}
					onChange={handleUsernameChange}
				/>
				<label htmlFor="password">posword</label>
				<input
					type="password"
					autoComplete="current-password"
					id="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<button>clik</button>
			</form>
			<h2>{loading}</h2>
			<h1>{grade?.toFixed(2)}</h1>
		</div>
	)
}

export default App
