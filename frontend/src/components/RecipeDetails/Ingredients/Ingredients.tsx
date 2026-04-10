import {FC} from "react";
import {Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {CheckCircleOutline} from "@mui/icons-material";

interface IProps {
	ingredients: string[];
}

const Ingredients: FC<IProps> = ({ingredients}) => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				mt: 4,
				mb: 4,
				borderRadius: 3,
				bgcolor: "background.paper",
				border: "1px solid",
				borderColor: "divider"
			}}
		>
			<Typography variant="h5" fontWeight={700} gutterBottom sx={{mb: 2, color: "primary.main"}}>
				Ingredients
			</Typography>
			<List disablePadding>
				{ingredients.map((ingredient, index) => (
					<ListItem key={index} disableGutters sx={{py: 0.5}}>
						<ListItemIcon sx={{minWidth: 36}}>
							<CheckCircleOutline fontSize="small" color="primary" />
						</ListItemIcon>
						<ListItemText
							primary={ingredient}
							primaryTypographyProps={{
								variant: "body1",
								fontWeight: 500,
								color: "text.primary"
							}}
						/>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export {Ingredients};
