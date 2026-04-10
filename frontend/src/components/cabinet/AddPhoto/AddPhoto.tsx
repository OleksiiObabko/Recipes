import {ChangeEvent, FC} from "react";
import {Alert, Box, Button, Typography, IconButton, Paper} from "@mui/material";
import {CloudUpload, Delete} from "@mui/icons-material";
import {imageValidator} from "../../../validators";

interface IProps {
	photos: File[],
	setPhotos: Function,
	errors: string[],
	setErrors: Function
}

const AddPhoto: FC<IProps> = ({photos, setPhotos, errors, setErrors}) => {
	const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files?.length) {
			const photo = e.target.files[0];
			setPhotos([...photos, photo]);
			setErrors([...errors, imageValidator(photo)]);
		}
	};

	const handleRemovePhoto = (index: number): void => {
		setPhotos(photos.filter((photo, i) => i !== index));
		setErrors(errors.filter((error, i) => i !== index));
	};

	return (
		<Box sx={{width: "100%"}}>
			<Typography variant="subtitle2" sx={{mb: 1, fontWeight: 500}}>Photos</Typography>
			<Box sx={{
				display: "grid",
				gridTemplateColumns: {xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)"},
				gap: 2,
				mb: 2
			}}>
				{
					photos.map((photo, index) => (
						<Paper
							key={index}
							elevation={0}
							sx={{
								position: "relative",
								aspectRatio: "1/1",
								borderRadius: 2,
								overflow: "hidden",
								border: "1px solid",
								borderColor: errors[index] ? "error.main" : "divider"
							}}
						>
							<Box
								component="img"
								src={URL.createObjectURL(photo)}
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "cover"
								}}
							/>
							<IconButton
								onClick={() => handleRemovePhoto(index)}
								size="small"
								sx={{
									position: "absolute",
									top: 4,
									right: 4,
									bgcolor: "rgba(255, 255, 255, 0.8)",
									'&:hover': { bgcolor: "white" }
								}}
							>
								<Delete fontSize="small" color="error" />
							</IconButton>
							{errors[index] && (
								<Box sx={{
									position: "absolute",
									bottom: 0,
									left: 0,
									right: 0,
									bgcolor: "error.main",
									color: "white",
									p: 0.5,
									fontSize: "0.7rem",
									textAlign: "center"
								}}>
									Invalid format
								</Box>
							)}
						</Paper>
					))
				}
				<label htmlFor="add-photo-input">
					<Paper
						variant="outlined"
						sx={{
							aspectRatio: "1/1",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							borderRadius: 2,
							borderStyle: "dashed",
							borderWidth: 2,
							bgcolor: "action.hover",
							transition: "0.2s",
							'&:hover': {
								borderColor: "primary.main",
								bgcolor: "action.selected"
							}
						}}
					>
						<CloudUpload color="primary" sx={{fontSize: 32, mb: 1}} />
						<Typography variant="caption" sx={{fontWeight: 500}}>Add Photo</Typography>
					</Paper>
				</label>
			</Box>
			<input
				color="primary"
				accept="image/jpeg, image/png, image/webp"
				type="file"
				onChange={handleAddPhoto}
				id="add-photo-input"
				style={{display: "none"}}
			/>
		</Box>
	);
};

export {AddPhoto};
