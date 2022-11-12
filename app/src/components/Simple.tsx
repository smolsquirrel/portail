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
function Simple({ data }: Props) {
	return (
		<>
			{data.contents.map((course: any) => (
				<Accordion sx={{ width: "100%" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Grid container>
							<Grid item xs={9}>
								<Typography variant="h6" align="left">
									{course.name}
								</Typography>
							</Grid>
							<Grid item container alignItems="center" xs={3}>
								<Grid item container spacing={1} xs={6}>
									<AccountCircleIcon color="disabled" sx={{ fontSize: 30 }} />
									<Typography variant="h6">{course.user}%</Typography>
								</Grid>
								<Grid item container spacing={1} xs={6}>
									<SchoolIcon color="disabled" sx={{ fontSize: 30 }} />
									<Typography variant="h6" color="text.secondary">
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
									<Card elevation={3} sx={{ marginY: 1 }}>
										<CardContent>
											<Grid container>
												<Grid item xs={9}>
													<Typography align="left">{x.name}</Typography>
												</Grid>
												<Grid item container xs={3}>
													<Grid item xs={6}>
														<Typography>{x.user.score}</Typography>
														<Typography>
															({x.user.grade.toFixed(1)}%)
														</Typography>
													</Grid>
													<Grid item>
														<Typography>{x.class.score}</Typography>
														<Typography>
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

export default Simple
