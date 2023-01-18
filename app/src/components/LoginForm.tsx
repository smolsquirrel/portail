import { useState } from "react"

import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface Props {
	handleIsLogged: Function
	handleLoaded: Function
}

const api_url = process.env.REACT_APP_API_URL

function LoginForm({ handleIsLogged, handleLoaded }: Props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (username === "" || password === "") {
			setError(true)
			return
		}
		setLoading(true)
		login().then(() => setLoading(false))
	}

	const login = async () => {
		const res = await fetch(api_url + "/login", {
			body: JSON.stringify({ username: username, password: password }),
			method: "post",
		})
		const x = await res.json()
		if (res.status === 200) {
			handleIsLogged(x)
			const res2 = await fetch(api_url + "/all_grades", {
				body: JSON.stringify({ url: x["url"], cookie: x["cookie"] }),
				method: "post",
			})
			handleLoaded(await res2.json())
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
							autoComplete="username email"
							autoFocus
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
					<Grid item>{loading ? <CircularProgress /> : <></>}</Grid>
				</Grid>
			</form>
		</Paper>
	)
}

export default LoginForm
