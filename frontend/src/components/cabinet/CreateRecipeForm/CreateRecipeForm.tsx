import {FC, useEffect, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, TextField, Card, CardContent, Divider, Typography, Grid, Snackbar} from "@mui/material";
import {CloudUpload, Timer, Groups, RestaurantMenu, Category, Add} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICreateRecipe, ICreateStage} from "../../../interfaces";
import {createRecipeValidator} from "../../../validators";
import {IngredientsForm} from "../IngredientsForm/IngredientsForm";
import {CategoryForm} from "../CategoryForm/CategoryForm";
import {KitchenForm} from "../KitchenForm/KitchenForm";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions, photoActions, recipeActions, stageActions, videoActions} from "../../../redux";
import {AddPhoto} from "../AddPhoto/AddPhoto";
import {AddVideo} from "../AddVideo/AddVideo";
import {StageForm} from "../../StageForm/StageForm";

const CreateRecipeForm: FC = () => {
	const {handleSubmit, control, setValue, formState: {errors}} = useForm<ICreateRecipe>({
		resolver: joiResolver(createRecipeValidator),
		mode: "onChange"
	});

	const dispatch = useAppDispatch();
	const {error, loading: recipeLoading, createdRecipeId} = useAppSelector(state => state.recipeReducer);
	const {loading: photoLoading} = useAppSelector(state => state.photoReducer);
	const {loading: videoLoading} = useAppSelector(state => state.videoReducer);
	const {loading: stageLoading} = useAppSelector(state => state.stageReducer);

	const onSubmit: SubmitHandler<ICreateRecipe> = (newRecipeData) => {
		dispatch(authActions.isLogin);
		dispatch(recipeActions.create(newRecipeData));
	};

	const [photos, setPhotos] = useState<File[]>([]);
	const [photoErrors, setPhotoErrors] = useState<string[]>([]);

	const [video, setVideo] = useState<File | undefined>(undefined);
	const [videoError, setVideoError] = useState<string | undefined>(undefined);

	const [stages, setStages] = useState<ICreateStage[]>([]);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (createdRecipeId) {
			setOpenSnackbar(true);
		}
	}, [createdRecipeId]);

	const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	useEffect(() => {
		if (createdRecipeId && photos.length) {
			photos.forEach(photo => {
				dispatch(photoActions.addPhotoToRecipe({recipeId: createdRecipeId, photo}));
			});
			setPhotos([]);
		}
	}, [createdRecipeId, dispatch, photos]);

	useEffect(() => {
		if (createdRecipeId && video) {
			dispatch(videoActions.addVideoToRecipe({recipeId: createdRecipeId, video}));
			setVideo(undefined);
		}
	}, [createdRecipeId, dispatch, video]);

	useEffect(() => {
		if (createdRecipeId && stages.length) {
			stages.forEach(stage => {
				dispatch(stageActions.addStageToRecipe({recipeId: createdRecipeId, newStage: stage}));
			});
			setStages([]);
		}
	}, [createdRecipeId, dispatch, stages]);

	const isValid = (): boolean => !!photoErrors.filter(error => error !== undefined).length || !!videoError || !stages.length;

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 3,
				width: "100%",
				pb: 6
			}}>
			{
				error &&
				<Alert severity="error" variant="filled" sx={{borderRadius: 2}}>
					Failed to create recipe. Please check all fields.
				</Alert>
			}
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={recipeLoading || photoLoading || videoLoading || stageLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert 
					onClose={handleCloseSnackbar} 
					severity="success" 
					variant="filled" 
					sx={{ width: '100%', borderRadius: 2 }}
				>
					Recipe has been created successfully and sent for moderation.
				</Alert>
			</Snackbar>

			{/* Section: Basic Information */}
			<Card elevation={0} sx={{borderRadius: 3, border: "1px solid", borderColor: "divider"}}>
				<CardContent sx={{p: 3}}>
					<Typography variant="h6" sx={{mb: 2, display: "flex", alignItems: "center", gap: 1, fontWeight: 600}}>
						Basic Information
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controller
								name="title"
								control={control}
								render={({field: {onChange, value}, fieldState: {error}}) => (
									<TextField
										fullWidth
										error={!!error}
										helperText={error?.message}
										value={value || ""}
										onChange={onChange}
										label="Recipe Title"
										variant="outlined"
										InputProps={{
											sx: { borderRadius: 2 }
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="description"
								control={control}
								render={({field: {onChange, value}, fieldState: {error}}) => (
									<TextField
										fullWidth
										multiline
										rows={3}
										error={!!error}
										helperText={error?.message}
										value={value || ""}
										onChange={onChange}
										label="Description"
										variant="outlined"
										InputProps={{
											sx: { borderRadius: 2 }
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="time"
								control={control}
								render={({field: {onChange, value}, fieldState: {error}}) => (
									<TextField
										fullWidth
										type="number"
										error={!!error}
										helperText={error?.message}
										value={value || ""}
										onChange={onChange}
										label="Total time (min)"
										InputProps={{
											startAdornment: <Timer fontSize="small" color="action" sx={{mr: 1}} />,
											sx: { borderRadius: 2 }
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="servings"
								control={control}
								render={({field: {onChange, value}, fieldState: {error}}) => (
									<TextField
										fullWidth
										type="number"
										error={!!error}
										helperText={error?.message}
										value={value || ""}
										onChange={onChange}
										label="Servings count"
										InputProps={{
											startAdornment: <Groups fontSize="small" color="action" sx={{mr: 1}} />,
											sx: { borderRadius: 2 }
										}}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Section: Classification */}
			<Card elevation={0} sx={{borderRadius: 3, border: "1px solid", borderColor: "divider"}}>
				<CardContent sx={{p: 3}}>
					<Typography variant="h6" sx={{mb: 2, display: "flex", alignItems: "center", gap: 1, fontWeight: 600}}>
						Categories
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CategoryForm errors={errors.category} setValue={setValue} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<KitchenForm setValue={setValue} errors={errors.kitchen} />
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Section: Media */}
			<Card elevation={0} sx={{borderRadius: 3, border: "1px solid", borderColor: "divider"}}>
				<CardContent sx={{p: 3}}>
					<Typography variant="h6" sx={{mb: 2, display: "flex", alignItems: "center", gap: 1, fontWeight: 600}}>
						Photos & Video
					</Typography>
					<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
						<AddPhoto photos={photos} setPhotos={setPhotos} errors={photoErrors} setErrors={setPhotoErrors} />
						<Divider sx={{my: 1}} />
						<AddVideo video={video} setVideo={setVideo} error={videoError} setError={setVideoError} />
					</Box>
				</CardContent>
			</Card>

			{/* Section: Ingredients */}
			<Card elevation={0} sx={{borderRadius: 3, border: "1px solid", borderColor: "divider"}}>
				<CardContent sx={{p: 3}}>
					<Typography variant="h6" sx={{mb: 2, display: "flex", alignItems: "center", gap: 1, fontWeight: 600}}>
						Ingredients
					</Typography>
					<IngredientsForm setValue={setValue} name="ingredients" errors={errors.ingredients} />
				</CardContent>
			</Card>

			{/* Section: Cooking Steps */}
			<Card elevation={0} sx={{borderRadius: 3, border: "1px solid", borderColor: "divider"}}>
				<CardContent sx={{p: 3}}>
					<Typography variant="h6" sx={{mb: 2, display: "flex", alignItems: "center", gap: 1, fontWeight: 600}}>
						Cooking Stages
					</Typography>
					<StageForm stages={stages} setStages={setStages} />
				</CardContent>
			</Card>

			<Button
				disabled={isValid()}
				type="submit"
				variant="contained"
				size="large"
				sx={{
					borderRadius: 3,
					py: 1.5,
					fontWeight: 600,
					boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
					'&:hover': {
						boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)"
					}
				}}
				startIcon={<Add />}
			>
				Create Recipe
			</Button>
		</Box>
	);
};

export {CreateRecipeForm};
