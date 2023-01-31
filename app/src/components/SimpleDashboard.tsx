import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Simple from './Simple';

interface Props {
	data: any
	semester: string
	setSemester: Function
	loaded: boolean
}

function SimpleDashboard({ data, semester, setSemester, loaded }: Props) {
	const semesterCount = Object.keys(data).length - 1
	return (
		<Container maxWidth={false} sx={{ pt: 3 }}>
			<Box
				sx={{
					backgroundColor: "rgba(255, 255, 255, 0.3)",
					borderRadius: 5,
					p: { xs: 1, sm: 2 },
				}}
			>
				<Grid container direction="column" spacing={2}>
					<Grid item container alignItems="center" spacing={2}>
						<Grid item xs={12} sm={4}>
							<Card sx={{ borderRadius: 5, backgroundColor: "#FF7043" }}>
								<CardContent sx={{ padding: 2, height: "100%" }}>
									<Grid container direction="column">
										<Grid item>
											<Box display="flex" justifyContent="flex-start">
												<AccountCircleIcon
													color="disabled"
													sx={{ fontSize: 30, color: "#FFFFFF" }}
												/>
											</Box>
										</Grid>
										<Grid item>
											<Typography
												sx={{ typography: { xs: "h4", md: "h3" } }}
												align="left"
												color="common.white"
											>
												<Box sx={{ fontWeight: "medium" }}>
													<CircularProgress sx={{ color: "white" }} />
												</Box>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												sx={{ typography: { xs: "h6", sm: "h5" } }}
												align="left"
												color="common.white"
											>
												Overall average
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Card sx={{ borderRadius: 5, backgroundColor: "#FF7043" }}>
								<CardContent sx={{ padding: 2, height: "100%" }}>
									<Grid container direction="column">
										<Grid item>
											<Box display="flex" justifyContent="flex-start">
												<SchoolIcon
													sx={{ fontSize: 30, color: "#FFFFFF" }}
												/>
											</Box>
										</Grid>
										<Grid item></Grid>
										<Grid item>
											<Typography
												sx={{ typography: { xs: "h4", md: "h3" } }}
												align="left"
												color="common.white"
											>
												<Box sx={{ fontWeight: "medium" }}>
													<CircularProgress sx={{ color: "white" }} />
												</Box>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												sx={{ typography: { xs: "h6", sm: "h5" } }}
												align="left"
												color="common.white"
											>
												Class average
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
						<Grid item container direction="column" xs={12} sm={4} spacing={1}>
							{[1, 2, 3].map((x) => (
								<Grid item>
									<Button
										variant={
											semester === x.toString() ? "contained" : "outlined"
										}
										fullWidth
										onClick={() => setSemester(x.toString())}
										disabled={semesterCount < x}
									>
										Étape {x}
									</Button>
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid item container>
						<Grid item xs={12} md={8}>
							<Simple data={data} loaded={loaded} />
						</Grid>
						<Grid item xs={12} md={4}></Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

export default SimpleDashboard
