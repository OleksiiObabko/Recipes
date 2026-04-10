import {FC, useEffect, useState} from "react";
import {Alert, Box, Button, IconButton, TextField, Typography, Paper, Divider} from "@mui/material";
import {ICreateStage} from "../../interfaces";
import {imageValidator} from "../../validators";
import {Delete, AddPhotoAlternate, Add} from "@mui/icons-material";

interface IProps {
	stages: ICreateStage[],
	setStages: Function
}

const StageForm: FC<IProps> = ({stages, setStages}) => {
	const [currentImage, setCurrentImage] = useState<File | undefined>(undefined);
	const [currentDescription, setCurrentDescription] = useState<string>("");
	const [photoError, setPhotoError] = useState<string | undefined>(undefined);

	const addStage = (): void => {
		if (!photoError && currentDescription.trim()) {
			setStages([...stages, {number: stages.length + 1, image: currentImage, description: currentDescription}]);
			setCurrentImage(undefined);
			setCurrentDescription("");
		}
	};

	const removeStage = (index: number): void => {
		const newStages = stages.filter((_, i) => i !== index);
		setStages(newStages.map((stage, i) => ({...stage, number: i + 1})));
	};

	const removeCurrPhoto = (): void => {
		setCurrentImage(undefined);
		setPhotoError(undefined);
	};

	useEffect(() => {
		if (currentImage) {
			setPhotoError(imageValidator(currentImage));
		}
	}, [currentImage]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", rowGap: 3}}>
			<Box sx={{display: "flex", flexDirection: "column", rowGap: 2}}>
				{stages.map((stage, index) => (
					<Paper 
						key={index} 
						variant="outlined"
						sx={{ 
							p: 2, 
							borderRadius: 3, 
							bgcolor: "background.paper",
							position: "relative",
							border: "1px solid",
							borderColor: "divider"
						}}
					>
						<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5}}>
							<Typography variant="subtitle1" sx={{fontWeight: 600, color: "primary.main"}}>
								Step {stage.number}
							</Typography>
							<IconButton onClick={() => removeStage(index)} size="small" color="error">
								<Delete fontSize="small" />
							</IconButton>
						</Box>
						
						<Box sx={{display: "flex", gap: 2, flexDirection: {xs: "column", sm: "row"}}}>
							{stage.image && (
								<Box sx={{ 
									width: {xs: "100%", sm: 120}, 
									height: 80, 
									borderRadius: 2, 
									overflow: "hidden",
									flexShrink: 0
								}}>
									<Box
										component="img"
										src={URL.createObjectURL(stage.image)}
										sx={{ width: "100%", height: "100%", objectFit: "cover" }}
									/>
								</Box>
							)}
							<Typography variant="body2" sx={{color: "text.secondary", flexGrow: 1}}>
								{stage.description}
							</Typography>
						</Box>
					</Paper>
				))}
			</Box>

			<Paper 
				elevation={0} 
				sx={{ 
					p: 2.5, 
					borderRadius: 3, 
					bgcolor: "action.hover",
					border: "1px dashed",
					borderColor: "primary.main"
				}}
			>
				<Typography variant="subtitle2" sx={{mb: 2, fontWeight: 600}}>New Step</Typography>
				<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
					<Box sx={{display: "flex", gap: 2, alignItems: "flex-start", flexDirection: {xs: "column", sm: "row"}}}>
						{!currentImage ? (
							<label htmlFor="stage-photo">
								<Paper
									variant="outlined"
									sx={{
										width: 120,
										height: 120,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										borderRadius: 2,
										borderStyle: "dashed",
										bgcolor: "background.paper",
										'&:hover': { borderColor: "primary.main", bgcolor: "action.selected" }
									}}
								>
									<AddPhotoAlternate color="action" />
									<Typography variant="caption" sx={{mt: 0.5}}>Add Photo</Typography>
								</Paper>
								<input
									accept="image/jpeg, image/png, image/webp"
									type="file"
									onChange={event => setCurrentImage(event.target.files![0])}
									id="stage-photo"
									style={{display: "none"}}
								/>
							</label>
						) : (
							<Box sx={{position: "relative", width: 120, height: 120, flexShrink: 0}}>
								<Box
									component="img"
									src={URL.createObjectURL(currentImage)}
									sx={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 2}}
								/>
								<IconButton
									onClick={removeCurrPhoto}
									size="small"
									sx={{
										position: "absolute",
										top: -8,
										right: -8,
										bgcolor: "white",
										boxShadow: 1,
										'&:hover': { bgcolor: "grey.100" }
									}}
								>
									<Delete fontSize="small" color="error" />
								</IconButton>
								{photoError && (
									<Alert severity="error" sx={{mt: 1, py: 0, px: 1, fontSize: "0.7rem"}}>
										{photoError}
									</Alert>
								)}
							</Box>
						)}

						<TextField
							fullWidth
							multiline
							rows={4}
							label="Step description"
							required
							variant="outlined"
							value={currentDescription}
							onChange={(e) => setCurrentDescription(e.target.value)}
							placeholder="Describe what needs to be done at this step..."
							InputProps={{ sx: {borderRadius: 2, bgcolor: "background.paper"} }}
						/>
					</Box>

					<Button
						fullWidth
						onClick={addStage}
						variant="contained"
						startIcon={<Add />}
						disabled={(currentDescription.trim().length < 5 || currentDescription.length > 1000) || !!photoError}
						sx={{borderRadius: 2, py: 1, fontWeight: 600}}
					>
						Add Step to Recipe
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export {StageForm};
