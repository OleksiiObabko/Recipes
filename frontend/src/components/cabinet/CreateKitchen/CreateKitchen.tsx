import {FC} from "react";
import {Alert, Box, Button, Card, CardContent, Snackbar, TextField, Typography} from "@mui/material";
import {Restaurant} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createKitchenValidator} from "../../../validators";
import {ICreateKitchen} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {kitchenActions} from "../../../redux";

const CreateKitchen: FC = () => {
	const dispatch = useAppDispatch();
	const {statusCode, errorMessage} = useAppSelector(state => state.kitchenReducer);
	const {handleSubmit, control, reset, formState: {isValid}} = useForm<ICreateKitchen>({
		resolver: joiResolver(createKitchenValidator),
		mode: "onSubmit"
	});

	const onSubmit: SubmitHandler<ICreateKitchen> = (newKitchen) => {
		dispatch(kitchenActions.createKitchen(newKitchen));
		reset();
	};

	return (
		<Box sx={{display: "flex", justifyContent: "center", width: "100%", mt: 4}}>
			<Card sx={{width: "100%", maxWidth: 500, borderRadius: 3, boxShadow: 3}}>
				<CardContent sx={{p: 4}}>
					<Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 3, justifyContent: "center"}}>
						<Restaurant color="primary" fontSize="large" />
						<Typography variant="h5" fontWeight="bold">
							Create New Kitchen
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
									label="Kitchen Title"
									variant="outlined"
									placeholder="e.g. Italian"
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
							Create Kitchen
						</Button>
					</Box>
				</CardContent>
			</Card>

			<Snackbar open={statusCode === 201} autoHideDuration={3000}>
				<Alert severity="success" sx={{width: "100%", borderRadius: 2}}>
					Kitchen has been created
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

export {CreateKitchen};
