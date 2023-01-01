import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Evaluation {
	name: string
	weight: number
	user: {
		score: string
		grade: number
	}
	class: {
		score: string
		grade: number
	}
}
interface EvalContainer {
	name: string
	weight: number
	user: number
	class: number
	contents: Array<Evaluation | EvalContainer>
}
interface Props {
	data: EvalContainer
}

function DetailedGrades({ data }: Props) {
	return (
		<>
			{data.contents.map((course: any) => (
				<Accordion
					sx={{ width: "100%", borderRadius: 3 }}
					square
					disableGutters
					key={course}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Grid container>
							<Grid item xs={7} sm={8} md={9}>
								<Typography
									sx={{ typography: { xs: "body1", md: "h6" } }}
									align="left"
								>
									{course.name}
								</Typography>
							</Grid>
							<Grid item container alignItems="center" xs={5} sm={4} md={3}>
								<Grid item xs={6} sx={{ display: "flex" }}>
									<AccountCircleIcon
										color="disabled"
										sx={{ fontSize: { xs: 20, md: 30 } }}
									/>
									<Typography sx={{ typography: { xs: "body1", sm: "h6" } }}>
										{course.user}%
									</Typography>
								</Grid>
								<Grid item xs={6} sx={{ display: "flex" }}>
									<SchoolIcon
										color="disabled"
										sx={{ fontSize: { xs: 20, md: 30 } }}
									/>
									<Typography
										sx={{ typography: { xs: "body1", sm: "h6" } }}
										color="text.secondary"
									>
										{course.class}%
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						{course.contents.map((competence: any) =>
							competence.contents.map((category: any) =>
								category.contents.map((x: any) => (
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
															)
														</Typography>
													</Grid>

													<Grid item xs={6}>
														<Typography
															sx={{
																typography: {
																	xs: "caption",
																	sm: "body1",
																},
															}}
														>
															{x.class.score}
														</Typography>
														<Typography
															sx={{
																typography: {
																	xs: "caption",
																	sm: "body1",
																},
															}}
														>
															({x.class.grade.toFixed(1)}%)
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</CardContent>
									</Card>
								))
							)
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</>
	)
}

export default DetailedGrades
