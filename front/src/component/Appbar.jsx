import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import { fetchWithoutBody } from '../function';
import { useContext } from 'react';
import { loginContext } from '../App';

const Appbar = () => {
	const { setIsLogin, setUserInfo, userInfo } = useContext(loginContext);
	console.log(userInfo);

	async function logout() {
		fetchWithoutBody('/api/auth/logout', 'post').then((data) => {
			if (data.data === 'you logged out succesfully!') {
				setIsLogin(false);
				setUserInfo({ userId: '', userName: '' });
			}
		});
	}
	return (
		<AppBar position="static">
			<Grid container>
				<Grid size={10}>
					<Toolbar variant="regular">
						<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h4">Good Morning typing!!</Typography>
					</Toolbar>
				</Grid>
				<Grid size={1} sx={{ mt: 1 }}>
					<Typography variant="contained" onClick={logout}>
						おはよう
						<br />
						{userInfo.userName}
					</Typography>
				</Grid>
				<Grid size={1}>
					<Button variant="contained" sx={{ background: grey[50], mt: 2 }} onClick={logout}>
						<LogoutIcon color="primary" />
					</Button>
				</Grid>
			</Grid>
		</AppBar>
	);
};

export default Appbar;
