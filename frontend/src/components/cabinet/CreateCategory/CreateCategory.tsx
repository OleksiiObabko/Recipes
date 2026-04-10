import {FC} from "react";
import {Alert, Box, Button, Card, CardContent, Snackbar, TextField, Typography} from "@mui/material";
import {Category} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createCategoryValidator} from "../../../validators";
import {ICreateCategory} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {categoryActions} from "../../../redux";

const CreateCategory: FC = () => {
	const dispatch = useAppDispatch();
	const {statusCode, errorMessage} = useAppSelector(state => state.categoryReducer);
	const {handleSubmit, control, reset, formState: {isValid}} = useForm<ICreateCategory>({
		resolver: joiResolver(createCategoryValidator),
		mode: "onSubmit"
	});

	const onSubmit: SubmitHandler<ICreateCategory> = (newCategory) => {
		dispatch(categoryActions.createCategory(newCategory));
		reset();
	};

	return (
		<Box sx={{display: "flex", justifyContent: "center", width: "100%", mt: 4}}>
			<Card sx={{width: "100%", maxWidth: 500, borderRadius: 3, boxShadow: 3}}>
				<CardContent sx={{p: 4}}>
					<Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 3, justifyContent: "center"}}>
						<Category color="primary" fontSize="large" />
						<Typography variant="h5" fontWeight="bold">
							Create New Category
						</Typography>
					</Box>

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3
						}}
					>
						<Controller
							name={"title"}
							control={control}
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									fullWidth
									error={!!error}
									helperText={error?.message}
									value={value || ""}
									onChange={onChange}
									label="Category Title"
									variant="outlined"
									placeholder="e.g. Desserts"
									sx={{
										"& .MuiOutlinedInput-root": {
											borderRadius: 2
										}
									}}
								/>
							)}
						/>
						<Button
							disabled={!isValid}
							type="submit"
							variant="contained"
							size="large"
							sx={{
								borderRadius: 2,
								textTransform: "none",
								fontWeight: "bold",
								py: 1.5
							}}
						>
							Create Category
						</Button>
					</Box>
				</CardContent>
			</Card>

			<Snackbar open={statusCode === 201} autoHideDuration={3000}>
				<Alert severity="success" sx={{width: "100%", borderRadius: 2}}>
					Category has been created
				</Alert>
			</Snackbar>
			<Snackbar open={!!errorMessage} autoHideDuration={3000}>
				<Alert severity="error" sx={{width: "100%", borderRadius: 2}}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export {CreateCategory};
