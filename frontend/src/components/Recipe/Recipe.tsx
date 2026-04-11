import {FC} from "react";
import {
	Avatar, Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Paper,
	Rating,
	Typography,
	Chip,
	Stack,
	Divider,
	Tooltip
} from "@mui/material";
import {
	AccessTime as AccessTimeIcon,
	Restaurant as RestaurantIcon,
	Category as CategoryIcon,
	Public as PublicIcon,
	PendingActions as PendingActionsIcon,
	CheckCircleOutline as CheckCircleIcon
} from "@mui/icons-material";

import {IRecipe} from "../../interfaces";
import {BookToggle} from "../BookToggle/BookToggle";
import {DeleteButton} from "../cabinet/DeleteButton/DeleteButton";
import {getPrettyDate} from "../../helpers";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moderationActions} from "../../redux";
import {useNavigate} from "react-router-dom";

interface IProps {
	recipe: IRecipe | any;
	showModerateButton?: boolean;
	showDeleteButton?: boolean;
}

const Recipe: FC<IProps> = ({recipe, showModerateButton = false, showDeleteButton = false}) => {
	const {
		_id,
		category,
		kitchen,
		creator,
		createdAt,
		gallery,
		rating,
		reviewsCount,
		time,
		title,
		servings,
		isModerated
	} = recipe;
	const avatar = creator?.avatar;
	const userName = creator?.userName;

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const {statusCode, loading, errorMessage} = useAppSelector(state => state.moderationReducer);

	const handleModerate = (e: React.MouseEvent): void => {
		e.stopPropagation();
		dispatch(moderationActions.moderateRecipe(_id));
	};

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
				<Box sx={{position: "relative"}}>
					{gallery.length ?
						<CardMedia
							component="img"
							height="220"
							image={gallery[0].path}
							alt={`${title} preview`}
							onClick={() => navigate(`/recipes/${_id}`)}
							sx={{cursor: "pointer", objectFit: "cover"}}
						/> :
						<Paper
							sx={{
								height: 220,
								borderRadius: 0,
								bgcolor: "#f0f0f0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<Typography variant="body2" color="text.secondary">No image</Typography>
						</Paper>
					}
					<Box
						sx={{
							position: "absolute",
							top: 12,
							right: 12,
							display: "flex",
							flexDirection: "column",
							gap: 1
						}}
					>
						<Box
							sx={{
								bgcolor: "rgba(255, 255, 255, 0.9)",
								borderRadius: "50%",
								backdropFilter: "blur(4px)",
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
							}}
						>
							<BookToggle _id={_id} />
						</Box>
						{showDeleteButton && (
							<Box
								sx={{
									bgcolor: "rgba(255, 255, 255, 0.9)",
									borderRadius: "50%",
									backdropFilter: "blur(4px)",
									boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
								}}
							>
								<DeleteButton recipeId={_id} />
							</Box>
						)}
					</Box>
					
					<Box
						sx={{
							position: "absolute",
							bottom: 12,
							left: 12,
							display: "flex",
							gap: 1
						}}
					>
						<Chip
							label={category}
							size="small"
							icon={<CategoryIcon sx={{fontSize: "14px !important"}} />}
							sx={{
								bgcolor: "rgba(255, 255, 255, 0.9)",
								fontWeight: 600,
								backdropFilter: "blur(4px)",
								color: "primary.main",
								"& .MuiChip-icon": {color: "primary.main"}
							}}
						/>
						{isModerated !== undefined && (
							<Tooltip title={isModerated ? "Moderated" : "Waiting for moderation"}>
								<Chip
									label={isModerated ? "Approved" : "Pending"}
									size="small"
									icon={isModerated ? <CheckCircleIcon sx={{fontSize: "14px !important"}} /> : <PendingActionsIcon sx={{fontSize: "14px !important"}} />}
									sx={{
										bgcolor: isModerated ? "rgba(76, 175, 80, 0.9)" : "rgba(255, 152, 0, 0.9)",
										fontWeight: 600,
										backdropFilter: "blur(4px)",
										color: "#fff",
										"& .MuiChip-icon": {color: "#fff"}
									}}
								/>
							</Tooltip>
						)}
					</Box>
				</Box>

				<CardContent sx={{flexGrow: 1, display: "flex", flexDirection: "column", p: 3}}>
					<Typography
						variant="h6"
						onClick={() => navigate(`/recipes/${_id}`)}
						sx={{
							fontWeight: 700,
							mb: 1,
							cursor: "pointer",
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							minHeight: "3.2rem",
							lineHeight: 1.2,
							textTransform: "capitalize",
							"&:hover": {color: "primary.main"}
						}}
					>
						{title}
					</Typography>

					<Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
						<Rating name="read-only" value={rating} precision={0.5} readOnly size="small" />
						<Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
							{rating} ({reviewsCount})
						</Typography>
					</Stack>

					<Grid container spacing={1.5} sx={{mb: 2.5}}>
						<Grid item xs={6}>
							<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
								<AccessTimeIcon fontSize="small" color="action" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{time} min
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
								<RestaurantIcon fontSize="small" color="action" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{servings} servings
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
								<PublicIcon fontSize="small" color="action" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{kitchen} kitchen
								</Typography>
							</Box>
						</Grid>
					</Grid>

					<Box sx={{mt: "auto"}}>
						<Divider sx={{mb: 2, opacity: 0.6}} />
						<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2}}>
							{creator && (
								<Box
									sx={{display: "flex", alignItems: "center", gap: 1, cursor: "pointer", minWidth: 0, flexShrink: 1}}
									onClick={() => navigate(`/authors/${creator._id}`)}
								>
									<Avatar
										src={avatar || "/broken-image.jpg"}
										sx={{width: 28, height: 28, border: "1px solid rgba(0,0,0,0.05)"}}
									/>
									<Box sx={{minWidth: 0, flexGrow: 1}}>
										<Typography variant="caption" display="block" noWrap sx={{fontWeight: 700, lineHeight: 1}}>
											{userName}
										</Typography>
										<Typography variant="caption" color="text.secondary" sx={{fontSize: "0.65rem"}}>
											{getPrettyDate(createdAt)}
										</Typography>
									</Box>
								</Box>
							)}
							{!creator && (
								<Box sx={{minWidth: 0, flexGrow: 1}}>
									<Typography variant="caption" color="text.secondary" sx={{fontSize: "0.65rem"}}>
										{getPrettyDate(createdAt)}
									</Typography>
								</Box>
							)}
							
							<Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
								{showModerateButton && (
									<Button
										disabled={loading}
										onClick={handleModerate}
										variant="outlined"
										size="small"
										color="warning"
										sx={{borderRadius: 2, textTransform: "none", fontWeight: 600}}
									>
										Moderate
									</Button>
								)}
								<Button
									onClick={() => navigate(`/recipes/${_id}`)}
									variant="contained"
									size="small"
									sx={{borderRadius: 2, textTransform: "none", fontWeight: 600, boxShadow: "none"}}
								>
									Details
								</Button>
							</Stack>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Recipe};
