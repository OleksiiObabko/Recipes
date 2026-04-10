import {ChangeEvent, FC} from "react";
import {Alert, Box, Button, Typography, Paper, IconButton} from "@mui/material";
import {Movie, Delete, VideoCall} from "@mui/icons-material";

import {videoValidator} from "../../../validators";

interface IProps {
	video: File | undefined,
	setVideo: Function,
	error: string | undefined,
	setError: Function
}

const AddVideo: FC<IProps> = ({video, setError, error, setVideo}) => {
	const handleAddVideo = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files?.length) {
			const video: File = e.target.files[0];
			setVideo(video);
			setError(videoValidator(video));
		}
	};

	const handleRemoveVideo = (): void => {
		setVideo(undefined);
		setError(undefined);
	};

	return (
		<Box sx={{width: "100%"}}>
			<Typography variant="subtitle2" sx={{mb: 1, fontWeight: 500}}>Video (optional)</Typography>
			<input
				accept="video/mp4, video/webm"
				type="file"
				onChange={handleAddVideo}
				id="add-video-input"
				style={{display: "none"}}
			/>
			{
				video ? (
					<Paper
						elevation={0}
						sx={{
							position: "relative",
							width: "100%",
							maxWidth: "400px",
							aspectRatio: "16/9",
							borderRadius: 2,
							overflow: "hidden",
							border: "1px solid",
							borderColor: error ? "error.main" : "divider",
							bgcolor: "black"
						}}
					>
						<Box
							component="video"
							src={URL.createObjectURL(video)}
							controls
							sx={{
								width: "100%",
								height: "100%",
								objectFit: "contain"
							}}
						/>
						<IconButton
							onClick={handleRemoveVideo}
							size="small"
							sx={{
								position: "absolute",
								top: 8,
								right: 8,
								bgcolor: "rgba(255, 255, 255, 0.8)",
								'&:hover': { bgcolor: "white" },
								zIndex: 1
							}}
						>
							<Delete fontSize="small" color="error" />
						</IconButton>
						{error && (
							<Alert 
								severity="error" 
								sx={{ 
									position: "absolute", 
									bottom: 0, 
									left: 0, 
									right: 0,
									borderRadius: 0,
									py: 0
								}}
							>
								{error}
							</Alert>
						)}
					</Paper>
				) : (
					<label htmlFor="add-video-input">
						<Paper
							variant="outlined"
							sx={{
								width: "100%",
								maxWidth: "400px",
								height: 100,
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
							<VideoCall color="primary" sx={{fontSize: 32, mb: 0.5}} />
							<Typography variant="caption" sx={{fontWeight: 500}}>Add Video Guide</Typography>
						</Paper>
					</label>
				)
			}
		</Box>
	);
};

export {AddVideo};
