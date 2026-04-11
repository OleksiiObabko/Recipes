import {FC, useState} from "react";
import {
	Alert,
	Avatar,
	Badge,
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	Tooltip,
	Typography
} from "@mui/material";
import {
	CalendarMonth as CalendarIcon,
	Group as GroupIcon,
	Visibility as VisibilityIcon,
	RestaurantMenu as RecipeIcon,
	AdminPanelSettings as AdminIcon
} from "@mui/icons-material";

import {IAuthor} from "../../interfaces";
import {LikeToggle} from "../LikeToggle/LikeToggle";
import {SubscribeToggle} from "../SubscribeToggle/SubscribeToggle";
import {ReportButton} from "../ReportButton/ReportButton";
import {useAppSelector} from "../../hooks";
import {BlockButton} from "../BlockButton/BlockButton";
import {getPrettyDate} from "../../helpers";
import {MakeAdminButton} from "../MakeAdminButton/MakeAdminButton";

interface IProps {
	author: IAuthor;
}

const AuthorInfo: FC<IProps> = ({author}) => {
	const {
		_id,
		userName,
		avatar,
		isSubscribed,
		recipes,
		block,
		totalSubscriptions,
		createdAt,
		totalSubscribers,
		role
	} = author;

	const [isReport, setIsReport] = useState<boolean>(false);
	const [isBlock, setIsBlock] = useState<boolean>(false);

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {successMessage, errorMessage} = useAppSelector(state => state.authorReducer);

	return (
		<Card sx={{
			borderRadius: 4,
			boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
			mb: 4,
			overflow: "visible",
			position: "relative"
		}}>
			<CardContent sx={{p: {xs: 2, md: 4}}}>
				{isReport && <Alert severity="success" sx={{mb: 2, borderRadius: 2}}>Report sent</Alert>}
				{isBlock && <Alert severity="success" sx={{mb: 2, borderRadius: 2}}>Author has been blocked</Alert>}
				{successMessage && <Alert severity="success" sx={{mb: 2, borderRadius: 2}}>{successMessage}</Alert>}
				{errorMessage && <Alert severity="error" sx={{mb: 2, borderRadius: 2}}>{errorMessage}</Alert>}

				<Grid container spacing={4} alignItems="center">
					{/* Аватар та основна інфа */}
					<Grid item xs={12} md={4}>
						<Stack direction="row" spacing={3} alignItems="center">
							<Badge
								overlap="circular"
								anchorOrigin={{vertical: "bottom", horizontal: "right"}}
								badgeContent={
									role === "admin" ? (
										<Tooltip title="Administrator">
											<Avatar sx={{
												width: 32,
												height: 32,
												bgcolor: "primary.main",
												border: "2px solid white"
											}}>
												<AdminIcon sx={{fontSize: 20}} />
											</Avatar>
										</Tooltip>
									) : null
								}
							>
								<Avatar
									src={avatar || undefined}
									sx={{
										width: {xs: 100, md: 120},
										height: {xs: 100, md: 120},
										boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
										border: "4px solid white"
									}}
								/>
							</Badge>
							<Box>
								<Typography variant="h4" fontWeight="800" sx={{color: "text.primary"}}>
									{userName}
								</Typography>
								<Stack direction="row" spacing={0.5} alignItems="center" sx={{color: "text.secondary", mt: 0.5}}>
									<CalendarIcon sx={{fontSize: 16}} />
									<Typography variant="body2">
										Joined {getPrettyDate(createdAt)}
									</Typography>
								</Stack>
							</Box>
						</Stack>
					</Grid>

					{/* Статистика */}
					<Grid item xs={12} md={5}>
						<Stack
							direction="row"
							spacing={2}
							justifyContent={{xs: "center", md: "flex-start"}}
						>
							<Paper elevation={0} sx={{
								p: 1.5,
								bgcolor: "grey.50",
								borderRadius: 3,
								minWidth: 100,
								textAlign: "center"
							}}>
								<RecipeIcon color="primary" sx={{mb: 0.5}} />
								<Typography variant="h6" fontWeight="700">{recipes}</Typography>
								<Typography variant="caption" color="text.secondary">Recipes</Typography>
							</Paper>
							<Paper elevation={0} sx={{
								p: 1.5,
								bgcolor: "grey.50",
								borderRadius: 3,
								minWidth: 100,
								textAlign: "center"
							}}>
								<GroupIcon color="primary" sx={{mb: 0.5}} />
								<Typography variant="h6" fontWeight="700">{totalSubscribers}</Typography>
								<Typography variant="caption" color="text.secondary">Subscribers</Typography>
							</Paper>
							<Paper elevation={0} sx={{
								p: 1.5,
								bgcolor: "grey.50",
								borderRadius: 3,
								minWidth: 100,
								textAlign: "center"
							}}>
								<VisibilityIcon color="primary" sx={{mb: 0.5}} />
								<Typography variant="h6" fontWeight="700">{totalSubscriptions}</Typography>
								<Typography variant="caption" color="text.secondary">Following</Typography>
							</Paper>
						</Stack>
					</Grid>

					{/* Кнопки дій */}
					<Grid item xs={12} md={3}>
						<Stack spacing={1.5} alignItems={{xs: "center", md: "flex-end"}}>
							<Stack direction="row" spacing={1} alignItems="center">
								<LikeToggle _id={_id} />
								<ReportButton authorId={_id} isReport={setIsReport} />
								{loginAuthor?.role === "admin" && (
									<BlockButton authorId={_id} isBlock={setIsBlock} />
								)}
							</Stack>

							<SubscribeToggle _id={_id} isSubscribed={isSubscribed} />

							{loginAuthor?.role === "admin" && role !== "admin" && (
								<MakeAdminButton _id={_id} />
							)}
						</Stack>
					</Grid>
				</Grid>

				{block && (
					<Alert severity="warning" sx={{mt: 3, borderRadius: 2}}>
						This author is blocked until {getPrettyDate(block)}
					</Alert>
				)}
			</CardContent>
		</Card>
	);
};

export {AuthorInfo};
