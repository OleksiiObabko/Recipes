import {FC} from "react";
import {Box, Typography, Paper, Chip} from "@mui/material";

interface IStage {
	stage: {
		_id: string,
		number: number,
		photo: string | null,
		description: string
	},
}

const Stage: FC<IStage> = ({stage}) => {
	const {number, photo, description} = stage;

	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				borderRadius: 3,
				bgcolor: "background.paper",
				border: "1px solid",
				borderColor: "divider",
				position: "relative",
				overflow: "hidden"
			}}
		>
			<Box sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 3}}>
				<Box sx={{flex: 1}}>
					<Box display="flex" alignItems="center" mb={2} gap={1.5}>
						<Chip
							label={`Step ${number}`}
							color="primary"
							sx={{fontWeight: 700, borderRadius: 1.5}}
						/>
					</Box>
					<Typography
						variant="body1"
						sx={{
							fontSize: "1.1rem",
							lineHeight: 1.7,
							color: "text.primary"
						}}
					>
						{description}
					</Typography>
				</Box>
				{photo && (
					<Box
						sx={{
							flex: {xs: "none", md: "0 0 300px"},
							height: 200,
							borderRadius: 2,
							overflow: "hidden",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
						}}
					>
						<Box
							component="img"
							src={photo}
							sx={{
								width: "100%",
								height: "100%",
								objectFit: "cover"
							}}
						/>
					</Box>
				)}
			</Box>
		</Paper>
	);
};

export {Stage};
