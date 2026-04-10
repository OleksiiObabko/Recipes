import {ChangeEvent, FC, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, TextField, Typography, Avatar, Paper, Stack} from "@mui/material";
import {CloudUpload as CloudUploadIcon, Person as PersonIcon, Save as SaveIcon} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {changeUserName, imageValidator} from "../../../validators";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions, authorActions} from "../../../redux";
import {getPrettyDate} from "../../../helpers";

interface IChangeUserName {
	userName?: string;
	avatar?: File;
}

const ProfileSettings: FC = () => {
	const dispatch = useAppDispatch();
	const {loading, statusCode, errorMessage} = useAppSelector(state => state.authorReducer);
	const {loginAuthor} = useAppSelector(state => state.authReducer);

	const {handleSubmit, control, reset} = useForm<IChangeUserName>({
		resolver: joiResolver(changeUserName),
		mode: "onSubmit"
	});

	const [avatar, setAvatar] = useState<File | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [avatarError, setAvatarError] = useState<string | undefined>("");

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		const photo = event.target.files![0];
		setAvatarError(imageValidator(photo));
		setAvatar((event.target as HTMLInputElement).files![0]);
	};

	const onSubmit: SubmitHandler<IChangeUserName> = async ({userName}) => {
		if (userName) {
			await dispatch(authorActions.changeUserName({userName}));
			reset();
		}
		if (avatar && !avatarError) {
			await dispatch(authorActions.uploadAvatar({avatar}));
			setAvatar(null);
		}
		dispatch(authActions.isLogin());
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				maxWidth: 600,
				mx: "auto",
				display: "flex",
				flexDirection: "column",
				gap: 4
			}}
		>
			<Typography variant="h5" sx={{fontWeight: 700, color: "primary.main", mb: 1}}>
				Profile Settings
			</Typography>

			{
				(statusCode === 200 || statusCode === 201) &&
				<Alert severity="success" sx={{borderRadius: 2}}>
					Changes complete
				</Alert>
			}
			{
				errorMessage &&
				<Alert severity="error" sx={{borderRadius: 2}}>
					{errorMessage}
				</Alert>
			}
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{
				loginAuthor?.block &&
				<Alert severity="warning" sx={{borderRadius: 2}}>
					You are blocked until {getPrettyDate(loginAuthor.block)}
				</Alert>
			}

			<Paper sx={{p: 3, borderRadius: 3, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "none", bgcolor: "rgba(0,0,0,0.01)"}}>
				<Typography variant="subtitle2" sx={{mb: 2, fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 1}}>
					Avatar
				</Typography>
				<Controller
					name={"avatar"}
					control={control}
					render={({field: {onChange}}) => (
						<Stack direction={{xs: "column", sm: "row"}} spacing={3} alignItems="center">
							<Avatar
								src={avatar ? URL.createObjectURL(avatar) : (loginAuthor?.avatar || "/broken-image.jpg")}
								sx={{width: 120, height: 120, border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}
							/>
							<Box>
								<input
									accept="image/jpeg, image/png, image/webp"
									type="file"
									onChange={event => {
										onChange();
										handleChangeAvatar(event);
									}}
									id="icon-button-avatar"
									style={{display: "none"}}
								/>
								<label htmlFor="icon-button-avatar">
									<Button
										component="span"
										variant="outlined"
										startIcon={<CloudUploadIcon />}
										sx={{borderRadius: 2, textTransform: "none", fontWeight: 600}}
									>
										Choose New Photo
									</Button>
								</label>
								<Typography variant="caption" display="block" sx={{mt: 1, color: "text.secondary"}}>
									Allowed JPG, PNG or WebP. Max size 2MB.
								</Typography>
								{avatar && (
									<Button 
										size="small" 
										color="error" 
										onClick={() => setAvatar(null)}
										sx={{mt: 1, textTransform: "none"}}
									>
										Remove selection
									</Button>
								)}
							</Box>
						</Stack>
					)}
				/>
				{avatar && avatarError && (
					<Alert severity="error" sx={{mt: 2, borderRadius: 2}}>
						{avatarError}
					</Alert>
				)}
			</Paper>

			<Paper sx={{p: 3, borderRadius: 3, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "none", bgcolor: "rgba(0,0,0,0.01)"}}>
				<Typography variant="subtitle2" sx={{mb: 2, fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 1}}>
					Personal Information
				</Typography>
				<Controller
					name={"userName"}
					control={control}
					render={({field: {onChange, value}, fieldState: {error}}) => (
						<TextField
							fullWidth
							error={!!error}
							helperText={error?.message}
							value={value || ""}
							placeholder={loginAuthor?.userName}
							onChange={(event) => {
								setUserName(event.target.value);
								onChange(event);
							}}
							variant="outlined"
							label="Username"
							InputProps={{
								startAdornment: <PersonIcon sx={{mr: 1, color: "action.active"}} />,
								sx: {borderRadius: 2}
							}}
						/>
					)}
				/>
			</Paper>

			<Button
				disabled={(!avatar && !userName) || !!avatarError}
				type="submit"
				variant="contained"
				size="large"
				startIcon={<SaveIcon />}
				sx={{
					borderRadius: 2,
					py: 1.5,
					textTransform: "none",
					fontWeight: 700,
					boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)"
				}}
			>
				Save Changes
			</Button>
		</Box>
	);
};

export {ProfileSettings};
