import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Simple from './Simple';

interface Props {
	data: any
	semester: string
	setSemester: Function
}

function Dashboard({ data, semester, setSemester }: Props) {
	const semesterCount = Object.keys(data).length - 1
	const curData = data[semester]
	return (
		<Grid container direction="column" sx={{ padding: 5 }} spacing={2}>
			<Grid item container spacing={3} alignItems="center">
				<Grid item xs={4}>
					<Card>
						<CardContent sx={{ padding: 2, height: "100%" }}>
							<Grid container direction="column">
								<Grid item>
									<Box display="flex" justifyContent="flex-start">
										<AccountCircleIcon color="disabled" sx={{ fontSize: 30 }} />
									</Box>
								</Grid>
								<Grid item></Grid>
								<Grid item>
									<Typography variant="h3" align="left">
										<Box sx={{ fontWeight: "medium" }}>
											{data[semester]["user"].toFixed(2)} %
										</Box>
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h5" align="left" color="text.secondary">
										Overall average
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card>
						<CardContent sx={{ padding: 2, height: "100%" }}>
							<Grid container direction="column">
								<Grid item>
									<Box display="flex" justifyContent="flex-start">
										<SchoolIcon color="disabled" sx={{ fontSize: 30 }} />
									</Box>
								</Grid>
								<Grid item></Grid>
								<Grid item>
									<Typography variant="h3" align="left">
										<Box sx={{ fontWeight: "medium" }}>
											{data[semester]["class"].toFixed(2)} %
										</Box>
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h5" align="left" color="text.secondary">
										Class average
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid container item direction="column" xs={4} spacing={2}>
					<Grid item>
						<Button
							variant={semester === "1" ? "contained" : "outlined"}
							fullWidth
							onClick={() => setSemester("1")}
							disabled={semesterCount < 1}
						>
							Étape 1
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant={semester === "2" ? "contained" : "outlined"}
							fullWidth
							onClick={() => setSemester("2")}
							disabled={semesterCount < 2}
						>
							Étape 2
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant={semester === "3" ? "contained" : "outlined"}
							fullWidth
							onClick={() => setSemester("3")}
							disabled={semesterCount < 3}
						>
							Étape 3
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item container spacing={2}>
				<Grid item xs={8}>
					<Simple data={curData} />
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
		</Grid>
	)
}

export default Dashboard
