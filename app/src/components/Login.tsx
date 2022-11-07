import Box from '@mui/material/Box';

import login_bg from '../assets/login_bg_blurry.jpg';
import LoginForm from './LoginForm';

interface Props {
	handleIsLogged: Function
}

function Login({ handleIsLogged }: Props) {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			sx={{
				backgroundImage: `url(${login_bg})`,
				height: "100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<LoginForm handleIsLogged={handleIsLogged} />
		</Box>
	)
}

export default Login
