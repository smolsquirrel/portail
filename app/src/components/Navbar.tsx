import React from "react"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

function Navbar() {
	return (
		<AppBar position="static">
			<Toolbar>
				<Button
					sx={{ color: "white" }}
					href="https://forms.gle/KokrUFayNYeAoqdMA"
					target="_blank"
					variant="contained"
				>
					Contact (questions, suggestions, bugs)
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
