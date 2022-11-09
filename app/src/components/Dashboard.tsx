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
			{Object.keys(data).map((x) => {
				return (
					<>
						<h1>Etape: {x}</h1>
						<h1>Average: {data[x]["user"].toFixed(2)}</h1>
						<h1>Class Average: {data[x]["class"].toFixed(2)}</h1>
					</>
				)
			})}
			<h4>
				im working on the site yall calm down pls. site breaks for 1 sec and neptune's
				oceans couldnt even contain all you tryhards' sweat. stop refreshing your average
				and go touch some grass
			</h4>
		</div>
	)
}

export default Dashboard
