import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (username === "" || password === "") {
			setError(true)
			return
		}
		login()
	}

	const login = async () => {
		const res = await fetch("https://hrb2ud.deta.dev/grades", {
			body: JSON.stringify({ username: username, password: password }),
			method: "post",
		})
		if (res.status === 200) {
			console.log("Success")
		} else {
			setError(true)
		}
	}
	return (
		<Paper elevation={10} sx={{ padding: 14, height: "40vh", borderRadius: 5 }}>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					direction="column"
					spacing={3}
					alignItems="center"
					justifyContent="center"
				>
					<Grid item>
						<Typography variant="h4">Log in</Typography>
					</Grid>
					<Grid item>
						<TextField
							id="username"
							label="Username"
							variant="outlined"
							fullWidth
							autoComplete="username"
							value={username}
							error={error}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="password"
							label="Password"
							variant="outlined"
							type="password"
							fullWidth
							autoComplete="current-password"
							value={password}
							error={error}
							helperText={error ? "Username or password incorrect" : ""}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>

					<Grid container item>
						<Button type="submit" variant="contained" fullWidth onClick={handleSubmit}>
							Log in
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	)
}

export default LoginForm
