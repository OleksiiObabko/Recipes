import {FC} from "react";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	Stack,
	Divider,
	Button,
	Paper
} from "@mui/material";
import {
	MenuBook as MenuBookIcon,
	People as PeopleIcon,
	PersonAdd as PersonAddIcon,
	LibraryBooks as LibraryBooksIcon
} from "@mui/icons-material";

import {IAuthor} from "../../interfaces";
import {LikeToggle} from "../LikeToggle/LikeToggle";
import {useNavigate} from "react-router-dom";

interface IProps {
	author: IAuthor;
}

const Author: FC<IProps> = ({author}) => {
	const {
		_id,
		avatar,
		userName,
		recipes,
		totalBook,
		totalSubscribers,
		totalSubscriptions
	} = author;

	const navigate = useNavigate();

	const stats = [
		{
			label: "Recipes",
			value: recipes,
			icon: <MenuBookIcon fontSize="small" color="action" />
		},
		{
			label: "In book",
			value: totalBook,
			icon: <LibraryBooksIcon fontSize="small" color="action" />
		},
		{
			label: "Subscribers",
			value: totalSubscribers,
			icon: <PeopleIcon fontSize="small" color="action" />
		},
		{
			label: "Subscriptions",
			value: totalSubscriptions,
			icon: <PersonAddIcon fontSize="small" color="action" />
		}
	];

	return (
		<Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{display: "flex"}}>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					borderRadius: 4,
					overflow: "hidden",
					transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
					border: "1px solid rgba(0,0,0,0.05)",
					boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
					"&:hover": {
						transform: "translateY(-4px)",
						boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
					}
				}}
			>
				<CardContent sx={{p: 3, flexGrow: 1, display: "flex", flexDirection: "column"}}>
					<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2}}>
						<Avatar
							src={avatar || "/broken-image.jpg"}
							sx={{
								width: 64,
								height: 64,
								border: "2px solid #fff",
								boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
								cursor: "pointer"
							}}
							onClick={() => navigate(`/authors/${_id}`)}
						/>
						<Box
							sx={{
								bgcolor: "rgba(255, 255, 255, 0.9)",
								borderRadius: "50%",
								backdropFilter: "blur(4px)",
							}}
						>
							<LikeToggle _id={_id} />
						</Box>
					</Box>

					<Typography
						variant="h6"
						noWrap
						onClick={() => navigate(`/authors/${_id}`)}
						sx={{
							fontWeight: 700,
							mb: 0.5,
							cursor: "pointer",
							"&:hover": {color: "primary.main"}
						}}
					>
						{userName}
					</Typography>
					
					<Typography variant="caption" color="text.secondary" sx={{mb: 2, display: "block"}}>
						Author ID: {_id.substring(0, 8)}...
					</Typography>

					<Divider sx={{mb: 2, opacity: 0.6}} />

					<Grid container spacing={2} sx={{mb: 3}}>
						{stats.map((stat, index) => (
							<Grid item xs={6} key={index}>
								<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
									{stat.icon}
									<Box sx={{minWidth: 0}}>
										<Typography variant="caption" color="text.secondary" display="block" noWrap>
											{stat.label}
										</Typography>
										<Typography variant="body2" sx={{fontWeight: 700}}>
											{stat.value}
										</Typography>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>

					<Box sx={{mt: "auto"}}>
						<Button
							fullWidth
							variant="contained"
							size="small"
							onClick={() => navigate(`/authors/${_id}`)}
							sx={{borderRadius: 2, textTransform: "none", fontWeight: 600, boxShadow: "none"}}
						>
							View Profile
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Author};
