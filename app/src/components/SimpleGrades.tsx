import React from "react"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SchoolIcon from "@mui/icons-material/School"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface Props {
	data: any
}

function SimpleGrades({ data }: Props) {
	console.log(data)
	return (
		<>
			{Object.keys(data).map((key) => (
				<Accordion sx={{ width: "100%", borderRadius: 3 }} square disableGutters key={key}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Grid container>
							<Grid item xs={7} sm={8} md={9}>
								<Typography
									sx={{ typography: { xs: "body1", md: "h6" } }}
									align="left"
								>
									{key}
								</Typography>
							</Grid>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						{data[key].map((x: any) => (
							<Card elevation={3} sx={{ marginY: 1 }} key={x.name}>
								<CardContent>
									<Grid container>
										<Grid item xs={6} sm={7} md={8}>
											<Typography
												sx={{
													typography: {
														xs: "body2",
														sm: "body1",
													},
												}}
												align="left"
											>
												{x.name}
											</Typography>
										</Grid>
										<Grid item container xs={6} sm={5} md={4}>
											<Grid item xs={6}>
												<Typography
													sx={{
														typography: {
															xs: "caption",
															sm: "body1",
														},
													}}
												>
													{x.user.score}
												</Typography>
												<Typography
													sx={{
														typography: {
															xs: "caption",
															sm: "body1",
														},
													}}
												>
													(
													{x.user.grade === "AS"
														? "AS"
														: x.user.grade.toFixed(1)}
													%)
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						))}
					</AccordionDetails>
				</Accordion>
			))}
		</>
	)
}

export default SimpleGrades
