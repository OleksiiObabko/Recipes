import {FC, useEffect, useState} from "react";
import {
	Alert,
	AppBar,
	Avatar,
	Box,
	CircularProgress,
	Container,
	IconButton,
	MenuItem,
	Toolbar,
	Typography
} from "@mui/material";
import {Logout} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {baseURL} from "../../configs";

const Header: FC = () => {
	const {loginAuthor, loading, tokenData} = useAppSelector(state => state.authReducer);
	const [isLogout, setIsLogout] = useState<boolean>(false);
	const [wasTryToLogout, setWasTryToLogout] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!tokenData && wasTryToLogout) {
			setIsLogout(true);
			setTimeout(() => {
				setIsLogout(false);
			}, 2000);
		}
	}, [wasTryToLogout, tokenData]);

	const logout = async () => {
		await dispatch(authActions.logout());
		dispatch(authActions.cleanLoginAuthor());
		setWasTryToLogout(true);
	};

	return (
		<AppBar position="static" sx={{mb: 4}}>
			<Container maxWidth={"xl"}>
				<Toolbar disableGutters>
					<Box sx={{display: "flex", flexGrow: 1}}>
						<MenuItem component="a" href="/">
							<Typography textAlign="center">Home</Typography>
						</MenuItem>
						<MenuItem component="a" href="/recipes">
							<Typography textAlign="center">Recipes</Typography>
						</MenuItem>
						<MenuItem component="a" href="/authors">
							<Typography textAlign="center">Authors</Typography>
						</MenuItem>
					</Box>
					<Box sx={{display: "flex", columnGap: 2}}>
						{
							!loginAuthor && !loading &&
							<MenuItem component="a" href="/login">
								<Typography textAlign="center">Login</Typography>
							</MenuItem>
						}
						{
							loginAuthor && !loading &&
							<MenuItem>
								<Typography textAlign="center">{loginAuthor.userName}</Typography>
							</MenuItem>
						}
						<MenuItem>
							{
								loginAuthor?.avatar && !loading &&
								<Avatar component="a" href="/cabinet" src={`${baseURL}/${loginAuthor.avatar}`} />
							}
							{
								!loginAuthor?.avatar && !loading &&
								<Avatar component="a" href="/login" src="static/images/cards/paella.jpg" />
							}
						</MenuItem>
						{
							loginAuthor && !loading &&
							<IconButton onClick={logout}>
								<Logout sx={{color: "white"}} />
							</IconButton>
						}
					</Box>
					{
						loading && <CircularProgress color="inherit" />
					}
				</Toolbar>
			</Container>
			{
				isLogout && wasTryToLogout &&
				<Alert severity="success">
					Success logout
				</Alert>
			}
		</AppBar>
	);
};

export {Header};
