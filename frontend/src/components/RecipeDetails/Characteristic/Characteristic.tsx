import {FC} from "react";
import {Grid, Paper, Typography, Box, Stack} from "@mui/material";
import {Restaurant, Category, Groups, AccessTime} from "@mui/icons-material";

interface IProps {
	kitchen: string;
	category: string;
	servings: number;
	time: number;
}

const Characteristic: FC<IProps> = ({kitchen, category, servings, time}) => {
	const items = [
		{icon: <Restaurant color="primary" />, label: "Kitchen", value: kitchen},
		{icon: <Category color="primary" />, label: "Category", value: category},
		{icon: <Groups color="primary" />, label: "Servings", value: `${servings} pers.`},
		{icon: <AccessTime color="primary" />, label: "Time", value: `${time} min.`},
	];

	return (
		<Paper
			elevation={0}
			sx={{
				p: 2,
				mt: 4,
				mb: 4,
				borderRadius: 3,
				bgcolor: "background.paper",
				border: "1px solid",
				borderColor: "divider"
			}}
		>
			<Grid container spacing={2}>
				{items.map((item, index) => (
					<Grid item xs={6} sm={3} key={index}>
						<Stack direction="row" spacing={1} alignItems="center">
							<Box
								sx={{
									display: "flex",
									p: 1,
									borderRadius: 2,
									bgcolor: "primary.light",
									color: "primary.main",
									opacity: 0.8
								}}
							>
								{item.icon}
							</Box>
							<Box>
								<Typography variant="caption" color="text.secondary" sx={{display: "block", lineHeight: 1}}>
									{item.label}
								</Typography>
								<Typography variant="body2" fontWeight={700}>
									{item.value}
								</Typography>
							</Box>
						</Stack>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};

export {Characteristic};
