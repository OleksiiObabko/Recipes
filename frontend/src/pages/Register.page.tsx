import {FC, useEffect, useState} from "react";
import {LockOutlined} from "@mui/icons-material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	Typography,
	TextField,
	Backdrop,
	CircularProgress,
	Alert
} from "@mui/material";

import {IRegisterData} from "../interfaces";
import {signUp} from "../validators";
import {useAppDispatch, useAppSelector} from "../hooks";
import {authActions} from "../redux";

interface ISignUpForm extends IRegisterData {
	repeatPassword: string;
}

const RegisterPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {loading, errorMessage, statusCode} = useAppSelector(state => state.authReducer);
	const [wasTryToRegister, setWasTryToRegister] = useState<boolean>(false);

	const {handleSubmit, control, reset, formState: {isValid}} = useForm<ISignUpForm>({
		resolver: joiResolver(signUp),
		mode: "all"
	});

	const onSubmit: SubmitHandler<ISignUpForm> = async ({userName, email, password}) => {
		await dispatch(authActions.register({userName, password, email}));
		setWasTryToRegister(true);
	};

	useEffect(() => {
		if (statusCode === 201 && !errorMessage && wasTryToRegister) {
			reset();
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	}, [errorMessage, navigate, reset, statusCode, wasTryToRegister]);

	return (
		<Container component="main" maxWidth="xs">
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative"
				}}
			>
				{errorMessage && wasTryToRegister &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="error">
						{errorMessage}
					</Alert>
				}
				{statusCode === 201 && wasTryToRegister &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="success">
						Account has been created try to login
					</Alert>
				}
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name={"userName"}
						control={control}
						rules={{required: "User Name is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="User Name"
								margin="normal"
								fullWidth
								autoFocus
							/>
						)}
					/>
					<Controller
						name={"email"}
						control={control}
						rules={{required: "Email is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Email"
								margin="normal"
								fullWidth
							/>
						)}
					/>
					<Controller
						name={"password"}
						control={control}
						rules={{required: "Password is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Password"
								margin="normal"
								fullWidth
								type="password"
							/>
						)}
					/>
					<Controller
						name={"repeatPassword"}
						control={control}
						rules={{required: "Repeat Password is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Repeat Password"
								margin="normal"
								fullWidth
								type="password"
							/>
						)}
					/>
					<Button
						disabled={!isValid}
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link sx={{cursor: "pointer"}} onClick={() => navigate("/login")}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
export {RegisterPage};
