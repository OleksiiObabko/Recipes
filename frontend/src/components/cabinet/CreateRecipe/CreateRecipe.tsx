import {FC} from "react";
import {Box, Typography} from "@mui/material";

import {CreateRecipeForm} from "../CreateRecipeForm/CreateRecipeForm";

const CreateRecipe: FC = () => {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "100%",
			maxWidth: "800px",
			margin: "0 auto",
			py: 4,
			px: {xs: 2, md: 0}
		}}>
			<Typography 
				variant="h4" 
				component="h1" 
				gutterBottom 
				sx={{ 
					fontWeight: 600, 
					mb: 4,
					color: "text.primary",
					textAlign: "center"
				}}
			>
				Create New Recipe
			</Typography>
			<CreateRecipeForm />
		</Box>
	);
};

export {CreateRecipe};
