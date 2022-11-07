import Box from '@mui/material/Box';

import image from '../assets/bg.png';

interface Props {
	data: any
}

function Dashboard({ data }: Props) {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundImage: `url(${image})`,
				height: "100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<h1>Average: {data["user"].toFixed(2)}</h1>
			<h1>Class Average: {data["class"].toFixed(2)}</h1>
		</div>
	)
}

export default Dashboard
